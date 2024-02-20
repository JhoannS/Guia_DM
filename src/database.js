const mongoose = require("mongoose");

const { URI_CONNECT } = process.env;
const MONGODB_URI = URI_CONNECT;

mongoose
  .connect(MONGODB_URI)

  .then((db) => console.log(">>> Conectado a MONGO DB"))
  .catch((err) => console.log(err));
