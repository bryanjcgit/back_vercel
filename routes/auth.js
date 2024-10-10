const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/controlAuth");
const { validarCampos } = require("../middlewares/validar-campos");


const router = Router();

router.post("/login",[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('contraseña', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login );

module.exports = router;