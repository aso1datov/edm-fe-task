const db = require("../models");

const Focus = db.focus;

const findAll = (_req, res) => {
  Focus.find({}, (err, data) => {
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
