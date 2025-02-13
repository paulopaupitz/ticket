const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  preco: {
    type: Number,
    required: true,
  },
  quantidade: {
    type: Number,
    required: true,
  },
});

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;