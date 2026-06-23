import { Request, Response } from 'express';
import ServiceTicket from '../models/ServiceTicket';
import Contact from '../models/Contact';

// GET all tickets
export const getAllTickets = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, priority, contactId } = req.query;
    const where: any = {};

    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (contactId) where.contactId = contactId;

    const tickets = await ServiceTicket.findAll({
      where,
      include: [{ model: Contact, as: 'contact' }],
      order: [['createdAt', 'DESC']],
    });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tickets', details: error instanceof Error ? error.message : String(error) });
  }
};

// GET single ticket
export const getTicketById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const ticket = await ServiceTicket.findByPk(id, {
      include: [{ model: Contact, as: 'contact' }],
    });

    if (!ticket) {
      res.status(404).json({ error: 'Ticket not found' });
      return;
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ticket', details: error instanceof Error ? error.message : String(error) });
  }
};

// POST create new ticket
export const createTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, contactId, status, priority, dueDate, assignedTo } = req.body;

    if (!title || !description) {
      res.status(400).json({ error: 'title and description are required' });
      return;
    }

    const ticket = await ServiceTicket.create({
      title,
      description,
      contactId,
      status: status || 'open',
      priority: priority || 'medium',
      dueDate,
      assignedTo,
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create ticket', details: error instanceof Error ? error.message : String(error) });
  }
};

// PUT update ticket
export const updateTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const ticket = await ServiceTicket.findByPk(id);

    if (!ticket) {
      res.status(404).json({ error: 'Ticket not found' });
      return;
    }

    await ticket.update(req.body);
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update ticket', details: error instanceof Error ? error.message : String(error) });
  }
};

// DELETE ticket
export const deleteTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const ticket = await ServiceTicket.findByPk(id);

    if (!ticket) {
      res.status(404).json({ error: 'Ticket not found' });
      return;
    }

    await ticket.destroy();
    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete ticket', details: error instanceof Error ? error.message : String(error) });
  }
};
