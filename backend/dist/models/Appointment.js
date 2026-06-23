"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
const Contact_1 = __importDefault(require("./Contact"));
class Appointment extends sequelize_1.Model {
}
exports.Appointment = Appointment;
Appointment.init({
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
    description: sequelize_1.DataTypes.TEXT,
    startDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    location: sequelize_1.DataTypes.STRING,
    type: {
        type: sequelize_1.DataTypes.ENUM('meeting', 'call', 'email', 'task'),
        defaultValue: 'meeting',
    },
}, {
    sequelize: connection_1.sequelize,
    tableName: 'appointments',
    timestamps: true,
});
Appointment.belongsTo(Contact_1.default, { foreignKey: 'contactId', as: 'contact' });
Contact_1.default.hasMany(Appointment, { foreignKey: 'contactId', as: 'appointments' });
exports.default = Appointment;
