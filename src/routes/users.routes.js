const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const authenticateToken = require('../middlewares/auth.middleware');

// Rota para criar um novo usuário
router.post('/', usersController.createUser);

// Rota para obter os dados do usuário (requer autenticação)
router.get('/', authenticateToken, usersController.getUser);

// Rota para atualizar os dados do usuário (requer autenticação)
router.put('/update', authenticateToken, usersController.updateUser);

// Rota para excluir a conta do usuário (requer autenticação)
router.delete('/delete', authenticateToken, usersController.deleteUser);

module.exports = router;