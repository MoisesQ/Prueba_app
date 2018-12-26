const express = require('express');
const router = express.Router();

const User= require('../models/User');
const passport= require('passport');

router.get('/users/signin', (req,res)=>{
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req,res)=>{
    res.render('users/signup');
});

router.post('/users/signup', async (req,res) => {
    const { nombre, email, contrasenia, confirmar_contrasenia } = req.body;
    const errores = [];


    if(nombre.length <=0){
        errores.push({text:'Por favor insertar nombre'});
    }

    if(contrasenia != confirmar_contrasenia){
        errores.push({text:'La contraseña no coincide'});
    }

    if(contrasenia.length < 4){
        errores.push({text:'La contraseña debe contener al menos 5 caracteres'});
    }

    if(errores.length > 0){
        res.render('users/signup', {errores,nombre,email,contrasenia,confirmar_contrasenia });
    }else{
        const emailUsuario= await User.findOne({email: email});
        if(emailUsuario){
            req.flash('error_msg','El email ya esta en uso');
            res.redirect('/users/signup');
        }
        const nuevoUsuario= new User({nombre, email, contrasenia});
        nuevoUsuario.contrasenia= await nuevoUsuario.encryptPassword(contrasenia);
        await nuevoUsuario.save();
        req.flash('success_msg','Tú estás registrado');
        res.redirect('/users/signin');
    }
});

module.exports= router;