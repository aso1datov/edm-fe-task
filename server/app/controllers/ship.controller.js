const db = require("../models");
const Ship = db.ship;

const create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Data to create can not be empty!" });
    return;
  }

  const { name, focus, manufacturer, price } = req.body;

  if (!name || !focus || !manufacturer || !price) {
    res.status(400).send({
      message: "This fields are required: name, focus, manufacturer, price ",
    });

    return;
  }

  const ship = new Ship({
    name: req.body.name,
    focus: req.body.focusId,
    manufacturer: req.body.manufacturerId,
    price: req.body.price,
  });

  try {
    const data = await ship.save();

    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const findAll = async (req, res) => {
  const { orderBy, sortBy } = req.query;

  try {
    const data = await Ship.find({})
      .sort({ [orderBy]: sortBy === "asc" ? 1 : -1 })
      .populate("manufacturer focus", "-__v");

    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error getting the ships" });
  }
};

const findOne = (req, res) => {};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  try {
    const data = await Ship.findByIdAndUpdate(id, req.body).populate(
      "manufacturer focus",
      "-__v"
    );

    if (!data) {
      res.status(404).send({
        message: `Cannot update Ship with id=${id}`,
      });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({
      message: `Error updating Ship with id ${id}`,
      error,
    });
  }
};

const deleteOne = (req, res) => {};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  deleteOne,
};
