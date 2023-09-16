const mongoose = require("mongoose");

const Manufacturer = mongoose.model(
  "Manufacturer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
  })
);

module.exports = Manufacturer;
