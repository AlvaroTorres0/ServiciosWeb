const express = require('express');
const app = express();

///Mandamos a llamar a las rutas
//Jalamos la ruta de route_users.js
//use es una propiedad de express
app.use(require('./registros_users/route_users.js'));
app.use(require('./registros_productos/route_productos.js'));
app.use(require('./registros_sucursales/route_sucursales.js'));

///


module.exports = app;