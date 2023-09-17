const mongoose = require("mongoose");

const Ship = mongoose.model(
  "Ship",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    focus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Focus",
    },
    manufacturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manufacturer",
    },
    price: {
      required: true,
      type: Number,
    },
  })
);

module.exports = Ship;
