const express = require('express');
const router = express.Router();

const Note= require('../models/Note');

router.get('/notes/add', (req,res)=>{
    res.render('notes/new-note');
});

router.post('/notes/new-note', async(req,res)=>{
    const { titulo,  descripcion }= req.body;
    const errores = [];

    if (!titulo){
        errores.push({text:'Por favor ingrese un titulo'});
    }

    if (!descripcion){
        errores.push({text:'Por favor ingrese una descripcion'});
    }
        
    if(errores.length>0) {
        res.render('notes/new-note', {
            errores,
            titulo,
            descripcion    
        });

    }else{
       const nuevaNota= new Note({ titulo, descripcion});
       await nuevaNota.save();
       req.flash('success_msg', 'Nota agregada con éxito');
       res.redirect('/notes');
    }
});

router.get('/notes', async (req,res)=>{
   
    const notas= await Note.find().sort({date: 'desc'});
    res.render('notes/all-notes', {notas});
});

router.get('/notes/edit/:id', async (req,res) =>{

    const nota= await Note.findById(req.params.id);
    res.render('notes/edit-note', {nota});
});

router.put('/notes/edit-note/:id', async (req,res)=>{
    const { titulo, descripcion}= req.body;
    await Note.findByIdAndUpdate(req.params.id, { titulo, descripcion});
    req.flash('success_msg', 'Nota actualizada con éxito');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', async (req,res)=>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Nota eliminada con éxito');
    res.redirect('/notes');
})

module.exports= router;