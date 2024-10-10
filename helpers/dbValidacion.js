const Usuario = require("../models/modelUser");

const existeNombre = async (nombre = "") => {  
  const nombreValido = await Usuario.findOne({ nombre });
  if (nombreValido) {
    throw new Error(`El nombre ${ nombre } ya esta registrado`);
  }
};

const usuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El usuario con el id ${id} no existe`);
  }
};

module.exports = {
  usuarioPorId,
  existeNombre
};
