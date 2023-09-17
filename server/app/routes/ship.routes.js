const { authJwt } = require("../middlewares");
const controller = require("../controllers/ship.controller");
const { isEditor } = require("../middlewares/auth-jwt");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );

    next();
  });

  app.get("/ships", [authJwt.authenticate, isEditor], controller.findAll);
  app.post("/ships", [authJwt.authenticate, isEditor], controller.create);
  app.put("/ships/:id", [authJwt.authenticate, isEditor], controller.update);
  app.delete(
    "/ships/:id",
    [authJwt.authenticate, isEditor],
    controller.deleteOne
  );
};
