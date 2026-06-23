"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppointment = exports.updateAppointment = exports.createAppointment = exports.getAppointmentById = exports.getAllAppointments = void 0;
const Appointment_1 = __importDefault(require("../models/Appointment"));
const Contact_1 = __importDefault(require("../models/Contact"));
// GET all appointments
const getAllAppointments = async (req, res) => {
    try {
        const { type, contactId } = req.query;
        const where = {};
        if (type)
            where.type = type;
        if (contactId)
            where.contactId = contactId;
        const appointments = await Appointment_1.default.findAll({
            where,
            include: [{ model: Contact_1.default, as: 'contact' }],
            order: [['startDate', 'ASC']],
        });
        res.json(appointments);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch appointments', details: error instanceof Error ? error.message : String(error) });
    }
};
exports.getAllAppointments = getAllAppointments;
// GET single appointment
const getAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment_1.default.findByPk(id, {
            include: [{ model: Contact_1.default, as: 'contact' }],
        });
        if (!appointment) {
            res.status(404).json({ error: 'Appointment not found' });
            return;
        }
        res.json(appointment);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch appointment', details: error instanceof Error ? error.message : String(error) });
    }
};
exports.getAppointmentById = getAppointmentById;
// POST create new appointment
const createAppointment = async (req, res) => {
    try {
        const { title, description, startDate, endDate, contactId, location, type } = req.body;
        if (!title || !startDate || !endDate) {
            res.status(400).json({ error: 'title, startDate and endDate are required' });
            return;
        }
        const appointment = await Appointment_1.default.create({
            title,
            description,
            startDate,
            endDate,
            contactId,
            location,
            type: type || 'meeting',
        });
        res.status(201).json(appointment);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create appointment', details: error instanceof Error ? error.message : String(error) });
    }
};
exports.createAppointment = createAppointment;
// PUT update appointment
const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment_1.default.findByPk(id);
        if (!appointment) {
            res.status(404).json({ error: 'Appointment not found' });
            return;
        }
        await appointment.update(req.body);
        res.json(appointment);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update appointment', details: error instanceof Error ? error.message : String(error) });
    }
};
exports.updateAppointment = updateAppointment;
// DELETE appointment
const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment_1.default.findByPk(id);
        if (!appointment) {
            res.status(404).json({ error: 'Appointment not found' });
            return;
        }
        await appointment.destroy();
        res.json({ message: 'Appointment deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete appointment', details: error instanceof Error ? error.message : String(error) });
    }
};
exports.deleteAppointment = deleteAppointment;
