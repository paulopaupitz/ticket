const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Função para gerar o token JWT
const generateToken = (user) => {
  const payload = {
    id: user.id,
    nome: user.nome,
    email: user.email,
    admin: user.admin,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Controlador para registrar um novo usuário
exports.register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verifica se o usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Cria o novo usuário
    const newUser = new User({
      nome,
      email,
      senha, // Armazena a senha em texto plano (NÃO RECOMENDADO)
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
};

// Controlador para logar um usuário
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verifica se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Compara a senha fornecida com a senha armazenada (em texto plano)
    if (senha!== user.senha) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gera o token JWT
    const token = generateToken(user);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao logar' });
  }
};