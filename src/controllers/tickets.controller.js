const Ticket = require('../models/Ticket');

// Controlador para criar um novo ingresso
exports.createTicket = async (req, res) => {
  try {
    const { nome, preco, quantidade } = req.body;

    const newTicket = new Ticket({
      nome,
      preco,
      quantidade,
    });

    await newTicket.save();

    res.status(201).json({ message: 'Ingresso criado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar ingresso' });
  }
};

// Controlador para obter todos os ingressos
exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter ingressos' });
  }
};

// Controlador para obter um ingresso pelo ID
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ingresso não encontrado' });
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter ingresso' });
  }
};

// Controlador para atualizar um ingresso pelo ID
exports.updateTicket = async (req, res) => {
  try {
    const { nome, preco, quantidade } = req.body;
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { nome, preco, quantidade },
      { new: true }
    );
    if (!updatedTicket) {
      return res.status(404).json({ message: 'Ingresso não encontrado' });
    }
    res.json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar ingresso' });
  }
};

// Controlador para excluir um ingresso pelo ID
exports.deleteTicket = async (req, res) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
    if (!deletedTicket) {
      return res.status(404).json({ message: 'Ingresso não encontrado' });
    }
    res.json({ message: 'Ingresso excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir ingresso' });
  }
};