const loginController = {};
const passport = require('passport')
const loginR = require("../models/loginR")

// formulario login
loginController.renderLoginForm = (req, res) => {
    res.render("login");
  };

// valida los datos del login
loginController.login = passport.authenticate('local',{
    failureRedirect: '/login',
    successRedirect: '/admin',
    failureFlash: true
})

loginController.renderUpForm = (req, res) => {
    res.render("signup");
};

// valida los datos del registro
loginController.signup = async (req, res) => {
    const errors = [];
    const {nombre, usuario, password, password2} = req.body
    
    if(!nombre || nombre.trim() === ''){
        errors.push({text: 'el campo "Nombre" no puede quedar vacio'})
    }
    if(!usuario || usuario.trim() === ''){
        errors.push({text: 'el campo "Usuario" no puede quedar vacio'})
    }
    if(!password || password.trim() === ''){
        errors.push({text: 'el campo "Contraseña" no puede quedar vacio'})
    }
    if(!password2 || password2.trim() === ''){
        errors.push({text: 'el campo "Repite tu contraseña" no puede quedar vacio'})
    }
    if(password != password2){
        errors.push({text: 'las contraseñas no coinciden'})
    }
    if(password.length < 8 ){
        errors.push({text: 'las contraseñas no puede ser menor a 8 caracteres'})
    }
    if(errors.length > 0){
        res.render('signup', {
            errors,
            nombre,
            usuario
        })
    }else{
        const usuarioLoginR = await loginR.findOne({usuario: usuario})
        if(usuarioLoginR){
            req.flash('error_msg', 'el usuario ingresado ya esta en uso.')
            res.redirect('signup')
        }else{
            const nuevoUsuario = new loginR({nombre, usuario, password})
            nuevoUsuario.password = await nuevoUsuario.encryptPassword(password)
            await nuevoUsuario.save()
            req.flash('exito_msg', "Te haz registrado!, ahora inicia sesion")
            res.redirect('login')
        }
    }
  };

loginController.logout = (req, res) => {

    req.logout( (err) => {

        if (err) { return next(err); }
        req.flash( "exito_msg" , "session cerrada, gracias por usar la app." );
        res.redirect( "/login" );

    });
}



module.exports = loginController