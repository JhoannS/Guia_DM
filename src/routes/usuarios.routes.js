const { Router } = require("express");
const router = Router();

const {
  renderUsuarios,
  crearUsuarios,
  renderFormularioUsuarios,
  editarUsuarios,
  eliminarUsuarios
} = require("../controllers/usuarios.controller");

const {isAuthenticated} = require('../helpers/auth')

// traer vista de los usuarios y lista de usuarios
router.get("/usuarios",isAuthenticated, renderUsuarios);

// crear usuarios
router.post("/usuarios/crear_usuario",isAuthenticated, crearUsuarios);

// editar usuarios (formulario)
router.get("/usuarios/editar/:id",isAuthenticated, renderFormularioUsuarios);

// editar finalmente al usuario
router.put("/usuarios/editar/:id",isAuthenticated, editarUsuarios);

// eliminar usuario
router.delete("/usuarios/eliminar/:id",isAuthenticated, eliminarUsuarios);

module.exports = router;
