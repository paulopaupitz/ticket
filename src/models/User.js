const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;
const BCRYPT_HASH_REGEX = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/;

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

UserSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) {
    return next();
  }

  if (BCRYPT_HASH_REGEX.test(this.senha)) {
    return next();
  }

  try {
    this.senha = await bcrypt.hash(this.senha, SALT_ROUNDS);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  if (!update) {
    return next();
  }

  const senha =
    update.senha ??
    (update.$set && Object.prototype.hasOwnProperty.call(update.$set, 'senha')
      ? update.$set.senha
      : undefined);

  if (!senha || BCRYPT_HASH_REGEX.test(senha)) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(senha, SALT_ROUNDS);

    if (update.senha) {
      update.senha = hashedPassword;
    }

    if (update.$set && Object.prototype.hasOwnProperty.call(update.$set, 'senha')) {
      update.$set.senha = hashedPassword;
    }

    this.setUpdate(update);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
