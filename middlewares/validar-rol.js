const validarAdminRole = (req, res, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: 'Se quiere verificar el rol sin validar el token primero'
    });
  }

  const { rol } = req.usuario;

  if (rol !== 'ADMIN_ROLE') {
    return res.status(403).json({
      msg: 'No tienes permisos para realizar esta acción'
    });
  }

  next();
};

module.exports = {
  validarAdminRole
};
