const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );

    next();
  });

  app.post(
    "/auth/signup",
    [verifySignUp.checkDuplicateUsername, verifySignUp.checkRolesExisted],
    controller.signUp
  );

  app.post("/auth/signin", controller.signIn);
  app.post("/auth/refresh", controller.refreshToken);
  app.get("/auth/validate", controller.validate);
};
