const mongoose = require('mongoose');

const dbConnection = async() => {
    try{
        await mongoose.connect(process.env.DBCONEXION,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
            );
            console.log("DB ONLINE DUHLESS");
    } catch (error) {
        throw new Error ("Error al conectar con la base de datos");
    }
}

module.exports = {
    dbConnection
}