const Role = require('../models/rolesModel');

// Obtener todos los roles
const getRoles = async (req, res) => {
  const roles = await Role.find();
  res.json({
    msg: 'Lista de roles',
    roles
  });
};

// Crear un nuevo rol
const createRole = async (req, res) => {
  const { rol } = req.body;

  try {
    const newRole = new Role({ rol });
    await newRole.save();

    res.json({
      msg: 'Rol creado exitosamente',
      newRole
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error al crear el rol',
      error
    });
  }
};

// Actualizar un rol
const updateRole = async (req, res) => {
  const { id } = req.params;
  const { rol } = req.body;

  try {
    const updatedRole = await Role.findByIdAndUpdate(id, { rol }, { new: true });
    res.json({
      msg: 'Rol actualizado correctamente',
      updatedRole
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error al actualizar el rol',
      error
    });
  }
};

// Eliminar un rol
const deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRole = await Role.findByIdAndDelete(id);
    res.json({
      msg: 'Rol eliminado correctamente',
      deletedRole
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error al eliminar el rol',
      error
    });
  }
};

module.exports = {
  getRoles,
  createRole,
  updateRole,
  deleteRole
};
