const { Router } = require("express");
const router = Router();

const {
  crearCitas,
  renderFormularioCita,
  editarCita,
  eliminarCita,
  renderAmbos,
} = require("../controllers/citas.controller");

const {isAuthenticated} = require('../helpers/auth')

// traer vista de las citas y lista de citas
router.get("/citas", isAuthenticated ,renderAmbos);

// crear cita
router.post("/citas/crear_cita",isAuthenticated, crearCitas);

// editar cita (formulario)
router.get("/citas/editar/:id",isAuthenticated, renderFormularioCita);

// editar finalmente a la cita
router.put("/citas/editar/:id",isAuthenticated, editarCita);

// eliminar cita
router.delete("/citas/eliminar/:id", isAuthenticated, eliminarCita);

module.exports = router;
