const express = require('express');
const {Router} = require('express');
//Tenemos que jalar el modelo
const model_sucursales = require('../../models/sucursales/newSucursal.js');
//Podemos hacerlo directo, pero para estructura y para seguimiento del proyecto es mejor asignarlo a Router
//Importamos el módulo que nos ayudará a encriptar
const app = Router();

//Registrar un nuevo usuario
//rea: require  res:responsive
app.post('/new/sucursal',(req,res) =>{
    //Body ya trae todo, los 4 datos
    let body = req.body;

    let registroSucursal = new model_sucursales({
        nombre: body.nombre,
        direccion: body.direccion,
        duenio: body.duenio,
        telefono: body.telefono
    });

    //Con esto guardamos en la BD
    //500 es si fue exitoso
    registroSucursal.save();
    res.status(200).json({
        ok:true,
        registroSucursal: registroSucursal,
        msj: "Registro exitoso"
    });
});

//Get todos
app.get('/obtener/datos/sucursal',async (req,res)=> {
    const respuesta = await model_sucursales.find();

    res.status(200).json({
        ok:true,
        respuesta
    });
});


//Get by ID
app.get('/obtener/datos/sucursal/:nombre',async (req,res)=> {
    //Declaramos el id
    let nombre =  req.params.nombre;
    //find es para encontrar todo el documento
    //existen diferentes tipos de find
    const repuesta = await model_sucursales.findById(nombre);

    res.status(200).json({
        ok:true,
        repuesta
    });
});




//Modificar  usuario
app.put('/update/registro/:id',async (res,req) => {
    let id = req.params.id;
    //siempre que se declare una constante va a ir al require
    const campos = req.body;
    //Si no queremos actualizar todos, los eliminamos


    //En este caso serán todos
    //new:true es para que nos devuelva el registro ya actualizado
    const respuestas = await model_sucursales.findByIdAndUpdate(id,campos,{new:true});

    res.status(200).json({
        ok:true,
        msj:"Actualizado con éxito",
        respuesta
    })
});

//Eliminar usuario
//con dos puntos podemos especificar cómo borraremos
app.delete('/delete/registro/:id',async (res,req)=>{
    let id = req.params.id;
    const respuesta = await model_sucursales.findByIdAndDelete();

    res.status(200).json({
        ok:true,
        msj:"Eliminado con éxito",
        respuesta
    });
});


module.exports = app;