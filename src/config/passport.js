const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const usuarioL = require("../models/loginR");

passport.use(
  new LocalStrategy(
    {
      usernameField: "usuario",
      passwordField: "password",
    },
    async (usuario, password, done) => {
      // ver si el usuario existe
      const usuarioExist = await usuarioL.findOne({ usuario: usuario});
      if (!usuarioExist) {
        return done(null, false, { message: "Usuario no encontrado" });
      } else {
        // validar contraseña del usuario
        const match = await usuarioExist.matchPassword(password);
        if (match) {
          return done(null, usuarioExist);
        } else {
          return done(null, false, { message: "Contraseña incorrecta." });
        }
      }
    }
  )
);

passport.serializeUser((usuarioExist, done) => {
  done(null, usuarioExist.id);
});

passport.deserializeUser(async (id, done) => {
    try {
      const usuario = await usuarioL.findById(id);
      if (!usuario) {
        return done(null, false);
      }
      // Si el usuario es encontrado, se devuelve en el callback
      return done(null, usuario);
    } catch (error) {
      return done(error);
    }
  });
