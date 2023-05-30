const express = require('express');
const {Router} = require('express');
//Tenemos que jalar el modelo
const model_product = require('../../models/productos/newProducto.js');
//Podemos hacerlo directo, pero para estructura y para seguimiento del proyecto es mejor asignarlo a Router
//Importamos el módulo que nos ayudará a encriptar
const app = Router();

//Registrar un nuevo usuario
//rea: require  res:responsive
app.post('/new/product',(req,res) =>{
    //Body ya trae todo, los 4 datos
    let body = req.body;

    let registroProduct = new model_product({
        nombre: body.nombre,
        precio: body.precio,
        cantidadStock: body.cantidadStock,
        idSucursal: body.idSucursal,
        descripcion: body.descripcion
    });

    //Con esto guardamos en la BD
    //500 es si fue exitoso
    registroProduct.save();
    res.status(200).json({
        ok:true,
        registroProduct,
        msj: "Producto registrado con éxito"
    });
});

//Buscar usuario
//async es para esperar una respuesta
//Get todos
app.get('/obtener/datos/producto',async (req,res)=> {
    const respuesta = await model_product.find();

    res.status(200).json({
        ok:true,
        respuesta
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
    const respuestas = await model_product.findByIdAndUpdate(id,campos,{new:true});

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
    const respuesta = await model_product.findByIdAndDelete();

    res.status(200).json({
        ok:true,
        msj:"Eliminado con éxito",
        respuesta
    });
});


module.exports = app;