const { Router } = require('express');
const { check } = require('express-validator');
const { getRoles, createRole, updateRole, deleteRole } = require('../controllers/controlRol');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', getRoles);


router.post('/', [
  check('rol', 'El rol es obligatorio').not().isEmpty(),
  validarCampos
], createRole);


router.put('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('rol', 'El rol es obligatorio').not().isEmpty(),
  validarCampos
], updateRole);


router.delete('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  validarCampos
], deleteRole);

module.exports = router;
