const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false, // Define o valor padrão como false
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;