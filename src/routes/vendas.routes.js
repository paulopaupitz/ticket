const express = require('express');
const router = express.Router();
const vendasController = require('../controllers/vendas.controller');
const authenticateToken = require('../middlewares/auth.middleware');

/**
 * Rotas da API de vendas.
 *
 * Estas rotas correspondem à versão ativa da aplicação e utilizam
 * o controlador definido em src/controllers/vendas.controller.js.
 * Qualquer ajuste na lógica de vendas deve ser realizado naquele
 * controlador para manter o comportamento consistente entre as rotas.
 */

// Rota para realizar uma venda (requer autenticação)
router.post('/', authenticateToken, vendasController.createVenda);

// Rota para obter as vendas do usuário (requer autenticação)
router.get('/', authenticateToken, vendasController.getVendas);

// Rota para obter uma venda pelo ID (requer autenticação)
router.get('/:id', authenticateToken, vendasController.getVendaById);

module.exports = router;
