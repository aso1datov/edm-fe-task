const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signUp = (req, res) => {
  const user = new User({
    username: req.body.username.toLowerCase().trim(),
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);

          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "viewer" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

const signIn = (req, res) => {
  const username = req.body.username.trim().toLowerCase();

  User.findOne({
    username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }

      const isPasswortValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!isPasswortValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      const payload = {
        id: user._id,
        username: user.username,
        roles: authorities,
      };

      const accessToken = jwt.sign({ user: payload }, config.secret, {
        expiresIn: "1h",
        algorithm: "HS256",
      });

      const refreshToken = jwt.sign({ user: payload }, config.secret, {
        expiresIn: "1d",
        algorithm: "HS256",
      });

      res
        .cookie("refresh-token", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .status(200)
        .send({
          ...payload,
          accessToken,
        });
    });
};

const refreshToken = (req, res) => {
  const refreshToken = req.cookies["refresh-token"];

  if (!refreshToken) {
    return res.status(401).send({ message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, config.secret);
    const accessToken = jwt.sign({ user: decoded.user }, config.secret, {
      expiresIn: "1h",
    });

    res.header("Authorization", `Bearer ${accessToken}`).send(decoded.user);
  } catch (error) {
    return res.status(400).send({ message: "Invalid refresh token." });
  }
};

module.exports = {
  refreshToken,
  signIn,
  signUp,
};
