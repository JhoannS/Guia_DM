const { Router } = require("express");
const router = Router();

const {
  renderIndex,
  crearOpinion,
} = require("../controllers/index.controller");

// traer vista de las opiniones y lista de opinioes
router.get("/", renderIndex);


// crear opinion
router.post("/crear_opinion", crearOpinion);

module.exports = router;
