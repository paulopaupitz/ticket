const express = require('express');
const router = express.Router();
const vendasController = require('../controllers/vendas.controller');
const authenticateToken = require('../middlewares/auth.middleware');

// Rota para realizar a venda de ingressos (requer autenticação)
router.post('/', authenticateToken, vendasController.createVenda);

module.exports = router;