"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrganization = exports.updateOrganization = exports.createOrganization = exports.getOrganizationById = exports.getAllOrganizations = void 0;
const Organization_1 = __importDefault(require("../models/Organization"));
// GET all organizations
const getAllOrganizations = async (req, res) => {
    try {
        const organizations = await Organization_1.default.findAll({
            order: [['createdAt', 'DESC']],
        });
        res.json(organizations);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch organizations', details: error instanceof Error ? error.message : String(error) });
    }
};
exports.getAllOrganizations = getAllOrganizations;
// GET single organization
const getOrganizationById = async (req, res) => {
    try {
        const { id } = req.params;
        const organization = await Organization_1.default.findByPk(id);
        if (!organization) {
            res.status(404).json({ error: 'Organization not found' });
            return;
        }
        res.json(organization);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch organization', details: error instanceof Error ? error.message : String(error) });
    }
};
exports.getOrganizationById = getOrganizationById;
// POST create new organization
const createOrganization = async (req, res) => {
    try {
        const { name, email, phone, website, address, city } = req.body;
        if (!name) {
            res.status(400).json({ error: 'name is required' });
            return;
        }
        const organization = await Organization_1.default.create({
            name,
            email,
            phone,
            website,
            address,
            city,
        });
        res.status(201).json(organization);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create organization', details: error instanceof Error ? error.message : String(error) });
    }
};
exports.createOrganization = createOrganization;
// PUT update organization
const updateOrganization = async (req, res) => {
    try {
        const { id } = req.params;
        const organization = await Organization_1.default.findByPk(id);
        if (!organization) {
            res.status(404).json({ error: 'Organization not found' });
            return;
        }
        await organization.update(req.body);
        res.json(organization);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update organization', details: error instanceof Error ? error.message : String(error) });
    }
};
exports.updateOrganization = updateOrganization;
// DELETE organization
const deleteOrganization = async (req, res) => {
    try {
        const { id } = req.params;
        const organization = await Organization_1.default.findByPk(id);
        if (!organization) {
            res.status(404).json({ error: 'Organization not found' });
            return;
        }
        await organization.destroy();
        res.json({ message: 'Organization deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete organization', details: error instanceof Error ? error.message : String(error) });
    }
};
exports.deleteOrganization = deleteOrganization;
