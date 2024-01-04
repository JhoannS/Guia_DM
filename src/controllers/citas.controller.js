const citasController = {};

const Citas = require("../models/citas");
const Usuarios = require("../models/usuarios"); // Importa el modelo de usuario

citasController.renderAmbos = async (req, res) => {
  try {
    const usuario = await Usuarios.find().lean(); // Obtiene todos los usuarios
    const citas = await Citas.find().lean(); // Obtiene todas las citas

    // Renderiza la vista 'citas' y pasa los datos
    res.render("citas", { usuario, citas });
  } catch (err) {
    // Manejo de errores
    res.status(500).send("Error al obtener datos de citas: " + err.message);
  }
};

// crear citas
citasController.crearCitas = async (req, res) => {
  const errors = [];
  const { paciente, tipo, ciudad, fecha, hora } = req.body;

  if (!paciente || paciente.trim() === "") {
    errors.push({ text: 'el campo "Paciente" no puede quedar vacio' });
  }
  if (!tipo || tipo.trim() === "") {
    errors.push({ text: 'el campo "Tipo" no puede quedar vacio' });
  }
  if (!ciudad || ciudad.trim() === "") {
    errors.push({ text: 'el campo "ciudad" no puede quedar vacio' });
  }
  if (!fecha || fecha.trim() === "") {
    errors.push({ text: 'el campo "Fecha" no puede quedar vacio' });
  }
  if (!hora || hora.trim() === "") {
    errors.push({ text: 'el campo "Hora" no puede quedar vacio' });
  }
  const usuario = await Usuarios.find().lean();
  const citas = await Citas.find().lean();

  if (errors.length > 0) {
    res.render("citas", {
      errors,
      usuario,
      citas,
    });
  } else {
    const citasUser = await Citas.findOne({ paciente: paciente });
    const citasHora = await Citas.findOne({ hora: hora, fecha: fecha });

    if (citasUser) {
      req.flash("error_msg", "el usuario ya cuenta con una cita activa");
      res.redirect("/citas");
    }
    else{
      if (citasHora) {
        req.flash(
          "error_msg",
          "La hora o fecha seleccionada ya está ocupada por otra cita"
        );
        res.redirect("/citas"); 
      }
      else {
        const nuevaCita = new Citas({
          paciente,
          tipo,
          ciudad,
          fecha,
          hora,
        });
  
        await nuevaCita.save();
        req.flash("exito_msg", "Cita creada exitosamente");
        res.redirect("/citas");
      }
    }
    
  }
};

// editar cita (formulario)
citasController.renderFormularioCita = async (req, res) => {
  const usuario = await Usuarios.find().lean(); // Obtiene todos los usuarios
  const citas = await Citas.find().lean(); // Obtiene todas las citas

  const citaA = await Citas.findById(req.params.id).lean();
  res.render("citas-editar", { usuario, citas, citaA });
};

// editar finalmente a la cita
citasController.editarCita = async (req, res) => {
  const { paciente, tipo, ciudad, fecha, hora } = req.body;
  await Citas.findByIdAndUpdate(req.params.id, {
    paciente,
    tipo,
    ciudad,
    fecha,
    hora,
  });
  req.flash("exito_msg", "Cita editada exitosamente");
  res.redirect("/citas");
};

// eliminar a la cita
citasController.eliminarCita = async (req, res) => {
  await Citas.findByIdAndDelete(req.params.id);
  req.flash("exito_msg", "Cita eliminada exitosamente");
  res.redirect("/citas");
};

module.exports = citasController;
