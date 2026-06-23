"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceTicket = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
const Contact_1 = __importDefault(require("./Contact"));
class ServiceTicket extends sequelize_1.Model {
}
exports.ServiceTicket = ServiceTicket;
ServiceTicket.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    contactId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: Contact_1.default,
            key: 'id',
        },
        onDelete: 'SET NULL',
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: { len: [1, 255] },
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('open', 'in_progress', 'resolved', 'closed'),
        defaultValue: 'open',
    },
    priority: {
        type: sequelize_1.DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
        defaultValue: 'medium',
    },
    dueDate: sequelize_1.DataTypes.DATE,
    assignedTo: sequelize_1.DataTypes.STRING,
}, {
    sequelize: connection_1.sequelize,
    tableName: 'service_tickets',
    timestamps: true,
});
ServiceTicket.belongsTo(Contact_1.default, { foreignKey: 'contactId', as: 'contact' });
Contact_1.default.hasMany(ServiceTicket, { foreignKey: 'contactId', as: 'tickets' });
exports.default = ServiceTicket;
