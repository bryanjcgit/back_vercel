const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        mongoose.connect(process.env.MONGO_CNN)
            .then(() => console.log('Conexion a mongo'))
            .catch(err => console.error('Sin conexion a mongo', err));
    } catch (error) {
        console.log(error);
        throw new Error("Error a la hora de iniciar la base de datos");
    }
};

module.exports = {
    dbConnection,
};