const indexController = {};
const opiniones = require('../models/opiniones')
const moment = require('moment');


indexController.renderIndex = async (req, res) => {
 

  const listaOpiniones = await opiniones.find().lean();
  res.render("index", {listaOpiniones});
};


//crear la opinion
indexController.crearOpinion = async (req, res) => {
  const { nombre, mensaje} = req.body;
  const nuevaOpinion = new opiniones({
    nombre,
    mensaje
  });

  await nuevaOpinion.save();
  req.flash('exito_msg', 'Comentario enviado :)')
  res.redirect("/");
};

module.exports = indexController