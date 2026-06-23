"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.createNote = exports.getNoteById = exports.getAllNotes = void 0;
const ActivityNote_1 = __importDefault(require("../models/ActivityNote"));
const Contact_1 = __importDefault(require("../models/Contact"));
// GET all activity notes
const getAllNotes = async (req, res) => {
    try {
        const { type, contactId } = req.query;
        const where = {};
        if (type)
            where.type = type;
        if (contactId)
            where.contactId = contactId;
        const notes = await ActivityNote_1.default.findAll({
            where,
            include: [{ model: Contact_1.default, as: 'contact' }],
            order: [['createdAt', 'DESC']],
        });
        res.json(notes);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch notes', details: error instanceof Error ? error.message : String(error) });
    }
};
exports.getAllNotes = getAllNotes;
// GET single note
const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await ActivityNote_1.default.findByPk(id, {
            include: [{ model: Contact_1.default, as: 'contact' }],
        });
        if (!note) {
            res.status(404).json({ error: 'Note not found' });
            return;
        }
        res.json(note);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch note', details: error instanceof Error ? error.message : String(error) });
    }
};
exports.getNoteById = getNoteById;
// POST create new note
const createNote = async (req, res) => {
    try {
        const { content, contactId, type } = req.body;
        if (!content) {
            res.status(400).json({ error: 'content is required' });
            return;
        }
        const note = await ActivityNote_1.default.create({
            content,
            contactId,
            type: type || 'note',
        });
        res.status(201).json(note);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create note', details: error instanceof Error ? error.message : String(error) });
    }
};
exports.createNote = createNote;
// PUT update note
const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await ActivityNote_1.default.findByPk(id);
        if (!note) {
            res.status(404).json({ error: 'Note not found' });
            return;
        }
        await note.update(req.body);
        res.json(note);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update note', details: error instanceof Error ? error.message : String(error) });
    }
};
exports.updateNote = updateNote;
// DELETE note
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await ActivityNote_1.default.findByPk(id);
        if (!note) {
            res.status(404).json({ error: 'Note not found' });
            return;
        }
        await note.destroy();
        res.json({ message: 'Note deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete note', details: error instanceof Error ? error.message : String(error) });
    }
};
exports.deleteNote = deleteNote;
