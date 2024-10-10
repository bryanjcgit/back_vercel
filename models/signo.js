const { Schema, model } = require('mongoose');

const SignoSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del signo es obligatorio'],
    unique: true
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción del signo es obligatoria']
  }
});

module.exports = model('Signo', SignoSchema);