const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/modelUser");

const validarToken = async (req, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No estás enviando el token",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(401).json({
        msg: "Token no válido: usuario no existe"
      });
    }


    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Usuario inactivo"
      });
    }

    req.usuario = usuario; 
    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validarToken,
};
