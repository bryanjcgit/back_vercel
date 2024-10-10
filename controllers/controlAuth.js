const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { jsonJWT } = require('../helpers/token');
const Usuario = require('../models/modelUser');

const login = async (req, res = response) => {
  const { nombre, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ nombre });
    if (!usuario) {
      return res.status(400).json({
        msg: 'El nombre no existe'
      });
    }

    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'El usuario está inhabilitado'
      });
    }

    const validaContraseña = bcryptjs.compareSync(contraseña, usuario.contraseña);
    if (!validaContraseña) {
      return res.status(400).json({
        msg: 'La contraseña no es correcta'
      });
    }

    const token = await jsonJWT(usuario.id);

    res.json({
      token,
      usuario
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Contacta al administrador'
    });
  }
};

module.exports = {
  login
};
