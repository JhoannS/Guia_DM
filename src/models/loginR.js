const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const loginRSchema = new Schema(
  {
    nombre: {
      type: String,
      require: true,
      trim: true,
    },
    usuario: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

loginRSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

loginRSchema.methods.matchPassword = async function(password){
  return await bcrypt.compare(password, this.password);
};

module.exports = model("LoginR", loginRSchema);
