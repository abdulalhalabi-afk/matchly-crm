import { Request, Response } from 'express';
import Contact from '../models/Contact';
import Organization from '../models/Organization';
import { Op } from 'sequelize';

// GET all contacts with optional filtering
export const getAllContacts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, organizationId, search } = req.query;
    const where: any = {};

    if (status) where.status = status;
    if (organizationId) where.organizationId = organizationId;
    if (search) {
      where[Op.or] = [
        { firstName: { [Op.iLike]: `%${search}%` } },
        { lastName: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const contacts = await Contact.findAll({
      where,
      include: [{ model: Organization, as: 'organization' }],
      order: [['createdAt', 'DESC']],
    });

    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts', details: error instanceof Error ? error.message : String(error) });
  }
};

// GET single contact by ID
export const getContactById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id, {
      include: [
        { model: Organization, as: 'organization' },
      ],
    });

    if (!contact) {
      res.status(404).json({ error: 'Contact not found' });
      return;
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact', details: error instanceof Error ? error.message : String(error) });
  }
};

// POST create new contact
export const createContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, phone, organizationId, position, status, tags, notes } = req.body;

    if (!firstName || !lastName) {
      res.status(400).json({ error: 'firstName and lastName are required' });
      return;
    }

    const contact = await Contact.create({
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
  } catch (error) {
    res.status(400).json({ error: 'Failed to create contact', details: error instanceof Error ? error.message : String(error) });
  }
};

// PUT update contact
export const updateContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);

    if (!contact) {
      res.status(404).json({ error: 'Contact not found' });
      return;
    }

    await contact.update(req.body);
    res.json(contact);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update contact', details: error instanceof Error ? error.message : String(error) });
  }
};

// DELETE contact
export const deleteContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);

    if (!contact) {
      res.status(404).json({ error: 'Contact not found' });
      return;
    }

    await contact.destroy();
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact', details: error instanceof Error ? error.message : String(error) });
  }
};
