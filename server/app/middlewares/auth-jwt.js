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

const isEditor = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const roles = await Role.find({
      _id: { $in: user.roles },
    });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "editor") {
        next();
        return;
      }
    }

    res.status(403).send({ message: "Editor role is required" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const authJwt = {
  authenticate,
  isEditor,
};

module.exports = authJwt;
