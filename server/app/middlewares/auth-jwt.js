const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");

const User = db.user;
const Role = db.role;

const authenticate = (req, res, next) => {
  const accessToken = req.headers["authorization"];
  // const refreshToken = req.cookies["refresh-token"];

  if (!accessToken) {
    return res
      .status(401)
      .send({ message: "Access Denied. No token provided" });
  }

  try {
    const [, token] = accessToken.split("Bearer ");
    const decoded = jwt.verify(token, config.secret);

    req.user = decoded.user;

    next();
  } catch (error) {
    //   if (!refreshToken) {
    //     return res
    //       .status(401)
    //       .send({ message: "Access Denied. No refresh token provided." });
    //   }

    //   try {
    //     const decoded = jwt.verify(refreshToken, config.secret);
    //     const accessToken = jwt.sign(decoded.user, config.secret, {
    //       expiresIn: "1d",
    //       algorithm: "HS256",
    //     });

    //     return res
    //       .cookie("refresh-token", refreshToken, {
    //         httpOnly: true,
    //         sameSite: "strict",
    //       })
    //       .header("Authorization", `Bearer ${accessToken}`)
    //       .send({ user: decoded.user });
    //   } catch (e) {
    res.status(401).send({ message: "Invalid Token", error });
    //   }
  }
};

function isEditor(req, res, next) {
  User.findById(req.user.id).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "editor") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Editor Role!" });

        return;
      }
    );
  });
}

const authJwt = {
  authenticate,
  isEditor,
};

module.exports = authJwt;
