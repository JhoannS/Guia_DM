const { Schema, model } = require("mongoose");


const citaSchema = new Schema(
  {
    paciente: {
      type: String,
      require: true,
      trim: true,
    },
    tipo: {
      type: String,
      require: true,
      trim: true,
    },
    ciudad: {
      type: String,
      require: true,
      trim: true,
    },
    fecha: {
      type: String,
      require: true,
      trim: true,
    },
    hora: {
      type: String,
      require: true,
      trim: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Citas", citaSchema);
