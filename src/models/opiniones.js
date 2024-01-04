const { Schema, model } = require("mongoose");

const opinionesSchema = new Schema(
  {
    nombre: {
      type: String,
      require: true,
      trim: true,
    },
    mensaje: {
      type: String,
      require: true,
      trim: true
    }
  },
  {
    timestamps: true,
  }
);


module.exports = model("Opiniones", opinionesSchema);
