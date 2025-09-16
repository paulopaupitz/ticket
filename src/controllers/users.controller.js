const User = require('../models/User');

// Controlador para obter os dados do usuário
exports.getUser = async (req, res) => {
  try {
    const { id: userId } = req.user || {};
    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const user = await User.findById(userId);
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
    const { id: userId } = req.user || {};
    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const { nome, email, senha } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { nome, email, senha },
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
    const { id: userId } = req.user || {};
    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir usuário' });
  }
};