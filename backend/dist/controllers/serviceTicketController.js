"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicket = exports.updateTicket = exports.createTicket = exports.getTicketById = exports.getAllTickets = void 0;
const ServiceTicket_1 = __importDefault(require("../models/ServiceTicket"));
const Contact_1 = __importDefault(require("../models/Contact"));
// GET all tickets
const getAllTickets = async (req, res) => {
    try {
        const { status, priority, contactId } = req.query;
        const where = {};
        if (status)
            where.status = status;
        if (priority)
            where.priority = priority;
        if (contactId)
            where.contactId = contactId;
        const tickets = await ServiceTicket_1.default.findAll({
            where,
            include: [{ model: Contact_1.default, as: 'contact' }],
            order: [['createdAt', 'DESC']],
        });
        res.json(tickets);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch tickets', details: error instanceof Error ? error.message : String(error) });
    }
};
exports.getAllTickets = getAllTickets;
// GET single ticket
const getTicketById = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await ServiceTicket_1.default.findByPk(id, {
            include: [{ model: Contact_1.default, as: 'contact' }],
        });
        if (!ticket) {
            res.status(404).json({ error: 'Ticket not found' });
            return;
        }
        res.json(ticket);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch ticket', details: error instanceof Error ? error.message : String(error) });
    }
};
exports.getTicketById = getTicketById;
// POST create new ticket
const createTicket = async (req, res) => {
    try {
        const { title, description, contactId, status, priority, dueDate, assignedTo } = req.body;
        if (!title || !description) {
            res.status(400).json({ error: 'title and description are required' });
            return;
        }
        const ticket = await ServiceTicket_1.default.create({
            title,
            description,
            contactId,
            status: status || 'open',
            priority: priority || 'medium',
            dueDate,
            assignedTo,
        });
        res.status(201).json(ticket);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create ticket', details: error instanceof Error ? error.message : String(error) });
    }
};
exports.createTicket = createTicket;
// PUT update ticket
const updateTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await ServiceTicket_1.default.findByPk(id);
        if (!ticket) {
            res.status(404).json({ error: 'Ticket not found' });
            return;
        }
        await ticket.update(req.body);
        res.json(ticket);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update ticket', details: error instanceof Error ? error.message : String(error) });
    }
};
exports.updateTicket = updateTicket;
// DELETE ticket
const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await ServiceTicket_1.default.findByPk(id);
        if (!ticket) {
            res.status(404).json({ error: 'Ticket not found' });
            return;
        }
        await ticket.destroy();
        res.json({ message: 'Ticket deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete ticket', details: error instanceof Error ? error.message : String(error) });
    }
};
exports.deleteTicket = deleteTicket;
