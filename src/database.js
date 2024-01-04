const mongoose = require("mongoose");

const { DM_MONGODB_HOST, DM_MONGODB_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${DM_MONGODB_HOST}/${DM_MONGODB_DATABASE}`;

mongoose
  .connect(MONGODB_URI)

  .then((db) => console.log(">>> Conectado a MONGO DB"))
  .catch((err) => console.log(err));
