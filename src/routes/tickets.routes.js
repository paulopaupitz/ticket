const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/tickets.controller');
const authenticateToken = require('../middlewares/auth.middleware');

// Rota para criar um novo ingresso (requer autenticação)
router.post('/', authenticateToken, ticketsController.createTicket);

// Rota para obter todos os ingressos
router.get('/', ticketsController.getTickets);

// Rota para obter um ingresso pelo ID
router.get('/:id', ticketsController.getTicketById);

// Rota para atualizar um ingresso pelo ID (requer autenticação)
router.put('/:id', authenticateToken, ticketsController.updateTicket);

// Rota para excluir um ingresso pelo ID (requer autenticação)
router.delete('/:id', authenticateToken, ticketsController.deleteTicket);

module.exports = router;