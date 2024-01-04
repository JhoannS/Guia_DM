const { Router } = require("express");
const router = Router();

const {
  renderLoginForm,
  renderUpForm,
  login,
  signup,
  logout
} = require("../controllers/login.controller");


// ingresar al login
router.get("/login", renderLoginForm);
// validador de login
router.post("/login", login)


// ingresar al crear usuarios
router.get("/signup", renderUpForm);

// validador de crear usuarios
router.post("/signup", signup)

router.get("/logout", logout)

router.pos
module.exports = router;
