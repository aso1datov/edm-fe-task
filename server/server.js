const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
// const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

const Role = db.role;
const Manufacturer = db.manufacturer;
const Focus = db.focus;
const User = db.user;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.get("/", (_req, res) => {
  res.json({ message: "OK" });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/focus.routes")(app);
require("./app/routes/manufacturer.routes")(app);
require("./app/routes/ship.routes")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      ["viewer", "editor"].forEach((roleName) => {
        new Role({
          name: roleName,
        }).save((err, role) => {
          if (err) {
            console.log("error", err);
          }

          console.log(`Role ${roleName} to roles collection`);
        });
      });
    }
  });

  Manufacturer.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      ["Anvil Aerospace", "Freight", "Drake Interplanetary"].forEach((name) => {
        new Manufacturer({ name }).save((err) => {
          if (err) {
            console.log("error", err);
          }

          console.log(`Manufacturer ${name} added to manufacturers collection`);
        });
      });
    }
  });

  Focus.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      [
        "Combat Light Fighter",
        "Combat Medium Fighter",
        "Combat Heavy Fighter",
        "Transporter Light",
        "Transporter Medium",
        "Transporter Passenger",
      ].forEach((name) => {
        new Focus({ name }).save((err) => {
          if (err) {
            console.log("error", err);
          }

          console.log(`Added ${name} to focus collection`);
        });
      });
    }

    User.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        Role.find({}).exec((err, data) => {
          if (err) {
            return;
          }

          [
            ["viewer", "Test123!", "viewer"],
            ["editor", "Test123!", "editor"],
          ].forEach(([username, password, userRole]) => {
            const role = data.find(({ name }) => name === userRole);

            const user = {
              username,
              password: bcrypt.hashSync(password, 8),
              roles: [role._id],
            };

            new User(user).save((err) => {
              if (err) {
                console.log(err);
              }

              console.log(`Added ${user.username} to users collection`);
            });
          });
        });
      }
    });
  });
}
