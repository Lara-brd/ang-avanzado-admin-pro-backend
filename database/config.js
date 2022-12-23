const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        //-> strictQuery to false quita el warning mongoose deprecated 
        mongoose.set("strictQuery", false);
        //ponemos la cadena de conexión de nuestro user de mongodb co
        await mongoose.connect(process.env.DB_CNN);

        console.log('DB Online');

    } catch(error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD, ver logs');
    }

}

module.exports = {
    dbConnection
}