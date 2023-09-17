const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      required: [true, "Please provide an username"],
      unique: [true, "User already exist"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password!"],
      required: true,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  })
);

module.exports = User;
