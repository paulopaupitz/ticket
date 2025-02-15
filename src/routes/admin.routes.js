const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/authenticateAdmin');

// Rota para criar um novo administrador
router.post('/', authenticateToken, isAdmin, adminController.criarAdmin);

// Rota para atualizar um administrador pelo ID
router.put('/updateAdmin/:id', authenticateToken, isAdmin, adminController.atualizarAdminById);

// Rota para atualizar o próprio administrador logado
router.put('/updateMyAdmin', authenticateToken, isAdmin, adminController.atualizarMyAdmin);

// Rota para tornar um usuário administrador
router.put('/makeAdmin/:id', authenticateToken, isAdmin, adminController.tornarAdmin);

// Rota para deletar um administrador pelo ID
router.delete('/:id', authenticateToken, isAdmin, adminController.deletarAdmin);

// Rota para listar todos os administradores
router.get('/getAdmins', authenticateToken, isAdmin, adminController.listarAdmins);

// Rota para listar todos os usuários comuns
router.get('/getComuns', authenticateToken, isAdmin, adminController.listarComuns);

// Rota para buscar um administrador por ID
router.get('/:id', authenticateToken, isAdmin, adminController.buscarAdminPorId);

module.exports = router;
