const { Router } = require("express");
const { check } = require("express-validator");
const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
  usersPatch
} = require("../controllers/controlUser");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarToken } = require("../middlewares/validarToken");
const { validarAdminRole } = require("../middlewares/validar-rol");
const { rolValido, usuarioPorId, existeNombre } = require('../helpers/dbValidacion');
const Role = require('../models/rolesModel');

const router = Router();

router.get("/", usersGet);

router.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('nombre').custom(existeNombre), 
  check('contraseña', 'La contraseña es obligatoria').not().isEmpty(),
  check('rol', 'El rol es obligatorio').custom(async (rol) => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
      throw new Error(`El rol '${rol}' no existe en la base de datos`);
    }
  }),
  validarCampos
], usersPost);

router.put("/:id",[
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom(usuarioPorId),
  check('rol').custom(rolValido),
  validarCampos
], usersPut);

router.delete("/:id",[
  validarToken,
  validarAdminRole, 
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom(usuarioPorId),
  validarCampos
], usersDelete);

router.patch("/", usersPatch);

module.exports = router;
