import { Request, Response } from 'express';
import ActivityNote from '../models/ActivityNote';
import Contact from '../models/Contact';

// GET all activity notes
export const getAllNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, contactId } = req.query;
    const where: any = {};

    if (type) where.type = type;
    if (contactId) where.contactId = contactId;

    const notes = await ActivityNote.findAll({
      where,
      include: [{ model: Contact, as: 'contact' }],
      order: [['createdAt', 'DESC']],
    });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes', details: error instanceof Error ? error.message : String(error) });
  }
};

// GET single note
export const getNoteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const note = await ActivityNote.findByPk(id, {
      include: [{ model: Contact, as: 'contact' }],
    });

    if (!note) {
      res.status(404).json({ error: 'Note not found' });
      return;
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch note', details: error instanceof Error ? error.message : String(error) });
  }
};

// POST create new note
export const createNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { content, contactId, type } = req.body;

    if (!content) {
      res.status(400).json({ error: 'content is required' });
      return;
    }

    const note = await ActivityNote.create({
      content,
      contactId,
      type: type || 'note',
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create note', details: error instanceof Error ? error.message : String(error) });
  }
};

// PUT update note
export const updateNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const note = await ActivityNote.findByPk(id);

    if (!note) {
      res.status(404).json({ error: 'Note not found' });
      return;
    }

    await note.update(req.body);
    res.json(note);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update note', details: error instanceof Error ? error.message : String(error) });
  }
};

// DELETE note
export const deleteNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const note = await ActivityNote.findByPk(id);

    if (!note) {
      res.status(404).json({ error: 'Note not found' });
      return;
    }

    await note.destroy();
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note', details: error instanceof Error ? error.message : String(error) });
  }
};
