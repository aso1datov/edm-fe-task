const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
  try {
    let newUser = new User({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    const savedUser = await newUser.save();

    if (Array.isArray(req.body.roles)) {
      const roles = await Role.find({
        name: { $in: req.body.roles },
      });

      savedUser.roles = roles.map((role) => role._id);
    } else {
      const defaultRole = Role.findOne({ name: "viewer" });
      savedUser.roles = [defaultRole._id];
    }

    await savedUser.save();
    res.status(201).send(savedUser);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const signIn = async (req, res) => {
  const username = req.body.username;

  try {
    const user = await User.findOne({ username }).populate("roles", "-__v");

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const roles = [];

    for (let i = 0; i < user.roles.length; i++) {
      roles.push("ROLE_" + user.roles[i].name.toUpperCase());
    }

    const payload = {
      id: user._id,
      username: user.username,
      roles,
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
  } catch (error) {
    res.status(500).send({ message: error });
  }
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

    res.send({ accessToken, ...decoded.user });
  } catch (error) {
    return res.status(400).send({ message: "Invalid refresh token" });
  }
};

module.exports = {
  refreshToken,
  signIn,
  signUp,
};
