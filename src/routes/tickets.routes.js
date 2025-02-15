const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/tickets.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/authenticateAdmin');

// Rota para criar um novo ingresso (requer autenticação e ser administrador)
router.post('/', authenticateToken, isAdmin, ticketsController.createTicket);

// Rota para obter todos os ingressos
router.get('/', ticketsController.getTickets);

// Rota para obter um ingresso pelo ID
router.get('/:id', ticketsController.getTicketById);

// Rota para atualizar um ingresso pelo ID (requer autenticação e ser administrador)
router.put('/:id', authenticateToken, isAdmin, ticketsController.updateTicket);

// Rota para excluir um ingresso pelo ID (requer autenticação e ser administrador)
router.delete('/:id', authenticateToken, isAdmin, ticketsController.deleteTicket);

module.exports = router;