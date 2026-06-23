"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.updateContact = exports.createContact = exports.getContactById = exports.getAllContacts = void 0;
const Contact_1 = __importDefault(require("../models/Contact"));
const Organization_1 = __importDefault(require("../models/Organization"));
const sequelize_1 = require("sequelize");
// GET all contacts with optional filtering
const getAllContacts = async (req, res) => {
    try {
        const { status, organizationId, search } = req.query;
        const where = {};
        if (status)
            where.status = status;
        if (organizationId)
            where.organizationId = organizationId;
        if (search) {
            where[sequelize_1.Op.or] = [
                { firstName: { [sequelize_1.Op.iLike]: `%${search}%` } },
                { lastName: { [sequelize_1.Op.iLike]: `%${search}%` } },
                { email: { [sequelize_1.Op.iLike]: `%${search}%` } },
            ];
        }
        const contacts = await Contact_1.default.findAll({
            where,
            include: [{ model: Organization_1.default, as: 'organization' }],
            order: [['createdAt', 'DESC']],
        });
        res.json(contacts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch contacts', details: error instanceof Error ? error.message : String(error) });
    }
};
exports.getAllContacts = getAllContacts;
// GET single contact by ID
const getContactById = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact_1.default.findByPk(id, {
            include: [
                { model: Organization_1.default, as: 'organization' },
            ],
        });
        if (!contact) {
            res.status(404).json({ error: 'Contact not found' });
            return;
        }
        res.json(contact);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch contact', details: error instanceof Error ? error.message : String(error) });
    }
};
exports.getContactById = getContactById;
// POST create new contact
const createContact = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, organizationId, position, status, tags, notes } = req.body;
        if (!firstName || !lastName) {
            res.status(400).json({ error: 'firstName and lastName are required' });
            return;
        }
        const contact = await Contact_1.default.create({
            firstName,
            lastName,
            email,
            phone,
            organizationId,
            position,
            status: status || 'lead',
            tags,
            notes,
        });
        res.status(201).json(contact);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create contact', details: error instanceof Error ? error.message : String(error) });
    }
};
exports.createContact = createContact;
// PUT update contact
const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact_1.default.findByPk(id);
        if (!contact) {
            res.status(404).json({ error: 'Contact not found' });
            return;
        }
        await contact.update(req.body);
        res.json(contact);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update contact', details: error instanceof Error ? error.message : String(error) });
    }
};
exports.updateContact = updateContact;
// DELETE contact
const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact_1.default.findByPk(id);
        if (!contact) {
            res.status(404).json({ error: 'Contact not found' });
            return;
        }
        await contact.destroy();
        res.json({ message: 'Contact deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete contact', details: error instanceof Error ? error.message : String(error) });
    }
};
exports.deleteContact = deleteContact;
