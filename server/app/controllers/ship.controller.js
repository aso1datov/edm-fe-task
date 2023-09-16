const db = require("../models");
const Ship = db.ship;

const create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Ship should have a name!" });
    // TODO: Add validations
    return;
  }

  const ship = new Ship({
    name: req.body.name,
    focus: req.body.focusId,
    manufacturer: req.body.manufacturerId,
    price: req.body.price,
    description: req.body.description,
  });

  ship.save((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "Ship was added successfully!" });
  });
};

const findAll = (req, res) => {
  Ship.find({})
    .populate("manufacturer", "-__v")
    .populate("focus", "-__v")
    .exec((err, data) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send(data);
    });
};

const findOne = (req, res) => {};

const update = (req, res) => {};

const deleteOne = (req, res) => {};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  deleteOne,
};
