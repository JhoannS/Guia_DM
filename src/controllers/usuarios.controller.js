const usuariosController = {};

const Usuario = require("../models/usuarios");

// traer vista de los usuarios y lista de usuarios
usuariosController.renderUsuarios = async (req, res) => {
  const listaUsuarios = await Usuario.find().lean();
  res.render("usuarios", { listaUsuarios });
};

// crear usuarios
usuariosController.crearUsuarios = async (req, res) => {

  const errors = [];
  const { documento, nombre, apellido, ciudad, telefono } = req.body;

  if (!documento || documento.trim() === "") {
    errors.push({ text: 'el campo "documento" no puede quedar vacio' });
  }
  if (!nombre || nombre.trim() === "") {
    errors.push({ text: 'el campo "nombre" no puede quedar vacio' });
  }
  if (!apellido || apellido.trim() === "") {
    errors.push({ text: 'el campo "apellido" no puede quedar vacio' });
  }
  if (!ciudad || ciudad.trim() === "") {
    errors.push({ text: 'el campo "ciudad" no puede quedar vacio' });
  }
  if (!telefono || telefono.trim() === "") {
    errors.push({ text: 'el campo "telefono" no puede quedar vacio' });
  }
  if (errors.length > 0) {
    res.render("usuarios", {
      errors
    });
  }else{
    const documentoExis = await Usuario.findOne({ documento: documento });
    const telefonoExist = await Usuario.findOne({telefono: telefono})
    
    if (documentoExis){
      req.flash("error_msg", "el documento ya existe, valide otro");
      res.redirect("/usuarios");
    }else{
      if (telefonoExist){
        req.flash("error_msg", "el telefono no puede ser igual a otro paciente");
        res.redirect("/usuarios");
      }else{
        const nuevoUsuario = new Usuario({
          documento,
          nombre,
          apellido,
          ciudad,
          telefono,
        });
      
        await nuevoUsuario.save();
        req.flash('exito_msg', 'Usuario creado exitosamente')
        res.redirect("/usuarios");
      }
    }
  }
  
};

// editar usuarios (formulario)
usuariosController.renderFormularioUsuarios = async (req, res) => {
  const usuarioA = await Usuario.findById(req.params.id).lean();
  res.render("usuarios-editar", { usuarioA });
};

// editar finalmente al usuario
usuariosController.editarUsuarios = async (req, res) => {
  const { documento, nombre, apellido, ciudad, telefono, estado } = req.body;
  await Usuario.findByIdAndUpdate(req.params.id, {
    documento,
    nombre,
    apellido,
    ciudad,
    telefono,
    estado,
  });
  req.flash('exito_msg', 'Usuario actualizado exitosamente')
  res.redirect("/usuarios");
};

// eliminar al usuario
usuariosController.eliminarUsuarios = async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id);
  req.flash('exito_msg', 'Usuario Eliminado exitosamente')
  res.redirect("/usuarios");
};

module.exports = usuariosController;
