const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        unique: true
    },
    contraseña: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
      },
    estado: {
        type: Boolean,
        default: true,
        required: true
    }
});

UsuarioSchema.methods.toJSON = function () {
    const { __v, contraseña, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
};

module.exports = model('Usuario', UsuarioSchema);
