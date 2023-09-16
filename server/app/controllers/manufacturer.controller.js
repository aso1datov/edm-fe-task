const db = require("../models");

const Manufacturer = db.manufacturer;

const findAll = (_req, res) => {
  Manufacturer.find({}, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send(data);
  });
};

module.exports = {
  findAll,
};
