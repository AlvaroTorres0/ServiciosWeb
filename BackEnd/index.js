//Solo se hace una vez
//express es el que nos ayudaa hacer comunicaciones
const express = require('express');
//Importamos la conexión
const {dbConnection} = require("./db/config.js");

//cors poder hacer actualizaciones desde cualquier red o dispositivo
const cors = require('cors');
//dotenv es para generar variables
require('dotenv').config();

const res = require('express/lib/response');


const app = express();
app.use(express.json());
app.use(cors());

dbConnection();

//Conexión a ruta
//require quiere decir que espera respuesta de algo
app.use(require('./routes/index_routes.js'));


app.get('/', (res,req) => {

    res.json({
        ok:true,
        msj:"HOLA"
    });
});

//Lo ponemos en escucha, y recibimos el parámetro es el callback de la bd,
app.listen(process.env.PUERTO,()=>{
    console.log(`Corriendo en el puerto: ${process.env.PUERTO}`);
});