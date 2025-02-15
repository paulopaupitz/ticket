const mongoose = require('mongoose');

const VendaSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true,
  },
  quantidade: {
    type: Number,
    required: true,
  },
  valorTotal: {
    type: Number,
    required: true,
  },
  dataVenda: {
    type: Date,
    default: Date.now,
  },
});

const Venda = mongoose.model('Venda', VendaSchema);

module.exports = Venda;