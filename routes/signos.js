const { Router } = require('express');
const { check } = require('express-validator');
const { getAllSignos, getOneSigno, updateSigno, createSigno, deleteSigno } = require('../controllers/controlSigno');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarToken } = require('../middlewares/validarToken');
const { validarAdminRole } = require('../middlewares/validar-rol');

const router = Router();

router.get('/', [validarToken], getAllSignos);
router.get('/:nombre', [
  validarToken,
  check('nombre', 'El nombre del signo es obligatorio').not().isEmpty(),
  validarCampos
], getOneSigno);

router.post('/', [
  validarToken,
  validarAdminRole,
  check('nombre', 'El nombre del signo es obligatorio').not().isEmpty(),
  check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
  validarCampos
], createSigno);

router.put('/:nombre', [
  validarToken,
  validarAdminRole,
  check('nombre', 'El nombre del signo es obligatorio').not().isEmpty(),
  check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
  validarCampos
], updateSigno);

router.delete('/:nombre', [
  validarToken,
  validarAdminRole,
  check('nombre', 'El nombre del signo es obligatorio').not().isEmpty(),
  validarCampos
], deleteSigno);

module.exports = router;
