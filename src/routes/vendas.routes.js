const express = require('express');
const router = express.Router();
const vendasController = require('../controllers/vendas.controller');
const authenticateToken = require('../middlewares/auth.middleware');

// Rota para realizar uma venda (requer autenticação)
router.post('/', authenticateToken, vendasController.createVenda);

// Rota para obter as vendas do usuário (requer autenticação)
router.get('/', authenticateToken, vendasController.getVendas);

// Rota para obter uma venda pelo ID (requer autenticação)
router.get('/:id', authenticateToken, vendasController.getVendaById);

module.exports = router;

