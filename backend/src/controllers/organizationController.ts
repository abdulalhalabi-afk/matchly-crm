import { Request, Response } from 'express';
import Organization from '../models/Organization';

// GET all organizations
export const getAllOrganizations = async (req: Request, res: Response): Promise<void> => {
  try {
    const organizations = await Organization.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch organizations', details: error instanceof Error ? error.message : String(error) });
  }
};

// GET single organization
export const getOrganizationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const organization = await Organization.findByPk(id);

    if (!organization) {
      res.status(404).json({ error: 'Organization not found' });
      return;
    }

    res.json(organization);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch organization', details: error instanceof Error ? error.message : String(error) });
  }
};

// POST create new organization
export const createOrganization = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, website, address, city } = req.body;

    if (!name) {
      res.status(400).json({ error: 'name is required' });
      return;
    }

    const organization = await Organization.create({
      name,
      email,
      phone,
      website,
      address,
      city,
    });

    res.status(201).json(organization);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create organization', details: error instanceof Error ? error.message : String(error) });
  }
};

// PUT update organization
export const updateOrganization = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const organization = await Organization.findByPk(id);

    if (!organization) {
      res.status(404).json({ error: 'Organization not found' });
      return;
    }

    await organization.update(req.body);
    res.json(organization);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update organization', details: error instanceof Error ? error.message : String(error) });
  }
};

// DELETE organization
export const deleteOrganization = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const organization = await Organization.findByPk(id);

    if (!organization) {
      res.status(404).json({ error: 'Organization not found' });
      return;
    }

    await organization.destroy();
    res.json({ message: 'Organization deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete organization', details: error instanceof Error ? error.message : String(error) });
  }
};
