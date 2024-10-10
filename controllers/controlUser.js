const { response, request } = require("express");
const Usuario = require("../models/modelUser"); 
const Role = require('../models/rolesModel');
const bcryptjs = require("bcryptjs");

const usersGet = async (req = request, res = response) => {
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(),
    Usuario.find()
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usersPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, contraseña, ...resto } = req.body;

  if (contraseña) {
    const salt = bcryptjs.genSaltSync();
    resto.contraseña = bcryptjs.hashSync(contraseña, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });
  res.json(usuario);
};

const usersPost = async (req, res = response) => {
  const { nombre, contraseña, rol } = req.body;

  try {
   
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
      return res.status(400).json({
        msg: `El rol '${rol}' no está registrado en la base de datos`
      });
    }
   
    const usuario = new Usuario({ nombre, contraseña, rol });
   
    const salt = bcryptjs.genSaltSync();
    usuario.contraseña = bcryptjs.hashSync(contraseña, salt);

   
    await usuario.save();

    res.json({
      msg: "Usuario creado exitosamente",
      usuario,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error interno del servidor",
      error,
    });
  }
};

const usersDelete = async (req, res = response) => {
  const { id } = req.params;

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true });
  res.json({
    msg: "Este usuario ha sido inhabilitado",
    usuario
  });
};

const usersPatch = (req, res = response) => {
  res.json({
    msg: "patch API - PatchUsers",
  });
};

module.exports = {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
  usersPatch 
};
