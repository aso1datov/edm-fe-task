const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

app.use(cookieParser());
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.disable("x-powered-by");

const db = require("./app/models");

const Role = db.role;
const Manufacturer = db.manufacturer;
const Focus = db.focus;
const User = db.user;
const Ship = db.ship;

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

async function initial() {
  try {
    let roles = [];
    let focuses = [];
    let manufacturers = [];

    const [roleCount, manufacturerCount, focusCount, userCount, shipCount] =
      await Promise.all([
        Role.estimatedDocumentCount(),
        Manufacturer.estimatedDocumentCount(),
        Focus.estimatedDocumentCount(),
        User.estimatedDocumentCount(),
        Ship.estimatedDocumentCount(),
      ]);

    if (roleCount === 0) {
      roles = await Role.insertMany([{ name: "viewer" }, { name: "editor" }]);

      console.log("New roles have been inserted");
    }

    if (manufacturerCount === 0) {
      manufacturers = await Manufacturer.insertMany([
        { name: "Anvil Aerospace" },
        { name: "Freight" },
        { name: "Drake Interplanetary" },
      ]);

      console.log("New manufacturers have been inserted");
    }

    if (focusCount === 0) {
      focuses = await Focus.insertMany([
        { name: "Combat Light Fighter" },
        { name: "Combat Medium Fighter" },
        { name: "Combat Heavy Fighter" },
        { name: "Transporter Light" },
        { name: "Transporter Medium" },
        { name: "Transporter Passenger" },
      ]);

      console.log("New focuses have been inserted");
    }

    if (userCount === 0) {
      await User.insertMany([
        {
          username: "editor",
          password: bcrypt.hashSync("Test123!", 8),
          roles: [roles.find((r) => r.name === "editor")._id],
        },
        {
          username: "viewer",
          password: bcrypt.hashSync("Test123!", 8),
          roles: [roles.find((r) => r.name === "viewer")._id],
        },
      ]);

      console.log("New users have been inserted");
    }

    if (shipCount === 0) {
      await Ship.insertMany([
        {
          name: "Anvil Hornet F7C",
          focus: focuses.find((f) => f.name === "Combat Medium Fighter")._id,
          manufacturer: manufacturers.find((m) => m.name === "Anvil Aerospace")
            ._id,
          price: 1496000,
        },
        {
          name: "Argo MPUV Cargo",
          focus: focuses.find((f) => f.name === "Transporter Light")._id,
          manufacturer: manufacturers.find((m) => m.name === "Freight")._id,
          price: 126540,
        },
        {
          name: "Drake Buccaneer",
          focus: focuses.find((f) => f.name === "Combat Light Fighter")._id,
          manufacturer: manufacturers.find(
            (m) => m.name === "Drake Interplanetary"
          )._id,
          price: 1128700,
        },
      ]);

      console.log("New ships have been inserted");
    }
  } catch (error) {
    console.log(error);
  }
}
