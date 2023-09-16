const mongoose = require("mongoose");

const Focus = mongoose.model(
  "Focus",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
  })
);

module.exports = Focus;
