const { authJwt } = require("../middlewares");
const controller = require("../controllers/focus.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );

    next();
  });

  app.get("/focuses", [authJwt.authenticate], controller.findAll);
};
