const Ticket = require('../models/Ticket');
const Venda = require('../models/Venda');

// Controlador para realizar a venda de ingressos
exports.createVenda = async (req, res) => {
  try {
    const { id: userId } = req.user || {};
    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

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
      user: userId,
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

// Controlador para obter as vendas do usuário
exports.getVendas = async (req, res) => {
  try {
    const { id: userId } = req.user || {};
    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const vendas = await Venda.find({ user: userId }).populate('ticket');
    res.json(vendas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter vendas' });
  }
};

// Controlador para obter uma venda pelo ID
exports.getVendaById = async (req, res) => {
  try {
    const { id: userId } = req.user || {};
    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const venda = await Venda.findById(req.params.id).populate('ticket');
    if (!venda) {
      return res.status(404).json({ message: 'Venda não encontrada' });
    }
    // Verifica se a venda pertence ao usuário autenticado
    if (venda.user.toString() !== userId) {
      return res.status(403).json({ message: 'Acesso negado' });
    }
    res.json(venda);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter venda' });
  }
};