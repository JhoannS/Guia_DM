const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const morgan = require("morgan");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

// inicialitations
const app = express();
require("./config/passport");

// settings

app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));

app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);

app.set("view engine", ".hbs");

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// global variables
app.use((req, res, next) => {
  res.locals.exito_msg = req.flash("exito_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null
  next();
});

// routes
// index
app.use(require("./routes/index.routes"));

//login
app.use(require("./routes/login.routes"));

//admin
app.use(require("./routes/admin.routes"));

//usuarios
app.use(require("./routes/usuarios.routes"));

//citas
app.use(require("./routes/citas.routes"));

// static files
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
