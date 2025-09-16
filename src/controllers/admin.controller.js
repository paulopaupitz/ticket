const Admin = require('../models/Admin');
const User = require('../models/User');

// Controlador para criar um novo administrador
exports.criarAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verifica se o administrador já existe
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Administrador já existe' });
    }

    // Cria o novo administrador
    const newAdmin = new Admin({
      username,
      password,
    });

    await newAdmin.save();

    res.status(201).json({ message: 'Administrador criado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar administrador' });
  }
};

// Controlador para atualizar um administrador pelo ID
exports.atualizarAdminById = async (req, res) => {
  try {
    const { username, password } = req.body;
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      { username, password },
      { new: true }
    );
    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Administrador não encontrado' });
    }
    res.json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar administrador' });
  }
};

// Controlador para atualizar o próprio administrador logado
exports.atualizarMyAdmin = async (req, res) => {
  try {
    const { id: adminId } = req.user || {};
    if (!adminId) {
      return res.status(401).json({ message: 'Administrador não autenticado' });
    }

    const { username, password } = req.body;
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { username, password },
      { new: true }
    );
    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Administrador não encontrado' });
    }
    res.json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar administrador' });
  }
};

// Controlador para tornar um usuário administrador pelo ID
exports.tornarAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    user.admin = true;
    await user.save();

    res.json({ message: 'Usuário atualizado para administrador com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
};

// Controlador para deletar um administrador pelo ID
exports.deletarAdmin = async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    if (!deletedAdmin) {
      return res.status(404).json({ message: 'Administrador não encontrado' });
    }
    res.json({ message: 'Administrador deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar administrador' });
  }
};

// Controlador para listar todos os administradores
exports.listarAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar administradores' });
  }
};

// Controlador para listar todos os usuários comuns
exports.listarComuns = async (req, res) => {
  try {
    const users = await User.find({ admin: false });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar usuários comuns' });
  }
};

// Controlador para buscar um administrador por ID
exports.buscarAdminPorId = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Administrador não encontrado' });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar administrador' });
  }
};