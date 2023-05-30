//Es el modelo o esquema
const {Schema,model} = require('mongoose');

//Es como el create table de SQL, solo que aquí lo hacemos con los modelos
//Aquí no existe llave primaria, ya que al ser NoSQL no es necesaria
//La llave aquí es el Object ID
//Podemos agregar nuevos campos sin afectar nada, así como eliminar, pero también tenemos que modificar la ruta en routes
const userSchema = Schema({
    nombre: {type:String},
    apellidos: {type:String},
    password: {type: String},
    role: {type: String},
    //Indicamos que va a ser un ID, ref es la referencia a la coleccion
    prueba: {type: Schema.Types.ObjectId,ref:'users'},
    edad: {type: Number}
});

//Mongo a veces en automático detecta los cambios de gramática 
module.exports = model('users',userSchema);