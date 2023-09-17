const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.mongoose.set("strictQuery", false);

db.user = require("./user.model");
db.role = require("./role.model");
db.ship = require("./ship.model");
db.focus = require("./focus.model");
db.manufacturer = require("./manufacturer.model");

db.ROLES = ["viewer", "editor"];

module.exports = db;
