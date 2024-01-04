const { Schema, model } = require("mongoose");

const usuariosShema = new Schema({
    documento: {
        type: Number,
        require: true,
        unique: true
    },
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    apellido: {
        type: String,
        require: true,
        trim: true
    },
    ciudad: {
        type: String,
        require: true,
        trim: true

    },
    telefono: {
        type: Number,
        require: true,
        trim: true,
        unique: true
    },
    estado: {
        type: String,
        default: "Activo"
    }
},{
    timestamps: true
})

module.exports = model('Usuarios', usuariosShema)