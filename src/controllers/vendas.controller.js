const Ticket = require('../models/Ticket');
const Venda = require('../models/Venda'); // Importe o modelo Venda

// Controlador para realizar a venda de ingressos
exports.createVenda = async (req, res) => {
  try {
    const { ticketId, quantidade } = req.body;

    // Verifica se o ingresso existe
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Ingresso não encontrado' });
    }

    // Verifica se há estoque suficiente
    if (ticket.quantidade < quantidade) {
      return res.status(400).json({ message: 'Estoque insuficiente' });
    }

    // Atualiza o estoque do ingresso
    ticket.quantidade -= quantidade;
    await ticket.save();

    // Cria a venda
    const newVenda = new Venda({
      user: req.user.id, // Associa a venda ao usuário logado
      ticket: ticketId,
      quantidade,
      valorTotal: ticket.preco * quantidade,
    });

    await newVenda.save();

    res.status(201).json({ message: 'Venda realizada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao realizar venda' });
  }
};