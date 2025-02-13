const User = require('../models/User');

// Controlador para criar um novo usuário
exports.createUser = async (req, res) => {
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
        senha,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar usuário' });
    }
  };

// Controlador para obter os dados do usuário
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter usuário' });
  }
};

// Controlador para atualizar os dados do usuário
exports.updateUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        nome,
        email,
        senha,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
};

// Controlador para excluir a conta do usuário
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir usuário' });
  }
};