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


// Compare this snippet from src/controllers/vendas.controller.js:
// const Venda = require('../models/Venda');
// const Ticket = require('../models/Ticket');
//
// const createVenda = async (req, res) => {
//   const { ticketId } = req.body;
//   const userId = req.user.id;
//
//   try {
//     const ticket = await Ticket.findById(ticketId);
//
//     if (!ticket) {
//       return res.status(404).json({ message: 'Ingresso não encontrado' });
//     }
//
//     if (ticket.vendido) {
//       return res.status(400).json({ message: 'Ingresso já vendido' });
//     }
//
//     const venda = await Venda.create({ userId, ticketId });
//
//     ticket.vendido = true;
//     await ticket.save();
//
//     res.status(201).json(venda);
//   } catch (error) {

//     res.status(500).json({ message: error.message });
//   }
// };
//
// const getVendas = async (req, res) => {
//   const userId = req.user.id;
//
//   try {
//     const vendas = await Venda.find({ userId });
//
//     res.json(vendas);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
//
// const getVendaById = async (req, res) => {
//   const userId = req.user.id;
//   const { id } = req.params;
//
//   try {
//     const venda = await Venda.findOne
//     ({ userId, _id: id });
//
//     if (!venda) {
//       return res.status(404).json({ message: 'Venda não encontrada' });
//     }
//
//     res.json(venda);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
//
// module.exports = { createVenda, getVendas, getVendaById };
    
