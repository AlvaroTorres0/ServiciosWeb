const express = require('express');
const {Router} = require('express');
//Tenemos que jalar el modelo
const model_users = require('../../models/usuarios/newUsers.js');
//Podemos hacerlo directo, pero para estructura y para seguimiento del proyecto es mejor asignarlo a Router
//Importamos el módulo que nos ayudará a encriptar
const md5 = require('bcryptjs');
const app = Router();

//Registrar un nuevo usuario
//rea: require  res:responsive
app.post('/new/user',(req,res) =>{
    //Body ya trae todo, los 4 datos
    let body = req.body;

    let registroUsers = new model_users({
        nombre:body.nombre,
        apellidos: body.apellidos,
        //Encriptamos la contraseña
        password: md5.hashSync(body.password,10),
        role: body.role,
        edad: body.edad
    });

    //Con esto guardamos en la BD
    //500 es si fue exitoso
    registroUsers.save();
    res.status(200).json({
        ok:true,
        registroUsers,
        msj: "Registro exitoso"
    });
});

app.get('/obtener/datos/usuarios',async (req,res)=> {
    const respuesta = await model_users.find();

    res.status(200).json({
        ok:true,
        respuesta
    });
});

//Buscar usuario
//async es para esperar una respuesta
app.get('/obtener/datos/usuarios/:id',async (req,res)=> {
    //Declaramos el id
    let id =  req.params.id;
    //find es para encontrar todo el documento
    //existen diferentes tipos de find
    const respuesta = await model_users.findById(id)
        .populate('prueba');
    res.status(200).json({
        ok:true,
        respuesta
    });
});

//Buscar usuarios con la edad mayor o igual a 20
app.get('/obtener/mayores20', async (req,res) => {
    const respuesta = await model_users.find({"edad" : {"$gte" : 20}})

    res.status(200).json({
        ok:true,
        mensaje:"Usuarios mayores a 20 años",
        respuesta
    });
});

//Buscar usuarios menores a 20 años
app.get('/obtener/menores20', async (req,res) => {
    const respuesta = await model_users.find({"edad" : {"$lt": 20}})

    res.status(200).json({
        ok:true,
        mensaje:"Usuarios menores a 20 años",
        respuesta
    });
});


//Modificar  usuario
app.put('/update/registro/:id',async (req,res) => {
    let id = req.params.id;
    //siempre que se declare una constante va a ir al require
    const campos = req.body;
    //Si no queremos actualizar todos, los eliminamos

    //delete campos.nombre;
    //delete campos.apellidos;
    //delete campos.role;

    //En este caso serán todos
    //new:true es para que nos devuelva el registro ya actualizado
    const respuesta = await model_users.findByIdAndUpdate(id,campos,{new:true});

    res.status(200).json({
        ok:true,
        msj:"Actualizado con éxito",
        respuesta
    })
});

//Eliminar usuario
//con dos puntos podemos especificar cómo borraremos
app.delete('/delete/registro/:id',async (req,res)=>{
    let id = req.params.id;
    const respuesta = await model_users.findByIdAndDelete(id);

    res.status(200).json({
        ok:true,
        msj:"Eliminado con éxito",
        respuesta
    });
});


module.exports = app;