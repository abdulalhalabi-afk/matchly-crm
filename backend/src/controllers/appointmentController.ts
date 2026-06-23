import { Request, Response } from 'express';
import Appointment from '../models/Appointment';
import Contact from '../models/Contact';

// GET all appointments
export const getAllAppointments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, contactId } = req.query;
    const where: any = {};

    if (type) where.type = type;
    if (contactId) where.contactId = contactId;

    const appointments = await Appointment.findAll({
      where,
      include: [{ model: Contact, as: 'contact' }],
      order: [['startDate', 'ASC']],
    });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments', details: error instanceof Error ? error.message : String(error) });
  }
};

// GET single appointment
export const getAppointmentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id, {
      include: [{ model: Contact, as: 'contact' }],
    });

    if (!appointment) {
      res.status(404).json({ error: 'Appointment not found' });
      return;
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointment', details: error instanceof Error ? error.message : String(error) });
  }
};

// POST create new appointment
export const createAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, startDate, endDate, contactId, location, type } = req.body;

    if (!title || !startDate || !endDate) {
      res.status(400).json({ error: 'title, startDate and endDate are required' });
      return;
    }

    const appointment = await Appointment.create({
      title,
      description,
      startDate,
      endDate,
      contactId,
      location,
      type: type || 'meeting',
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create appointment', details: error instanceof Error ? error.message : String(error) });
  }
};

// PUT update appointment
export const updateAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      res.status(404).json({ error: 'Appointment not found' });
      return;
    }

    await appointment.update(req.body);
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update appointment', details: error instanceof Error ? error.message : String(error) });
  }
};

// DELETE appointment
export const deleteAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      res.status(404).json({ error: 'Appointment not found' });
      return;
    }

    await appointment.destroy();
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete appointment', details: error instanceof Error ? error.message : String(error) });
  }
};
