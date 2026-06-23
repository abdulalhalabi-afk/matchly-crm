"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
const Organization_1 = __importDefault(require("./Organization"));
class Contact extends sequelize_1.Model {
}
exports.Contact = Contact;
Contact.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    organizationId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: Organization_1.default,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: { len: [1, 100] },
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: { len: [1, 100] },
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        validate: { isEmail: true },
    },
    phone: sequelize_1.DataTypes.STRING,
    position: sequelize_1.DataTypes.STRING,
    status: {
        type: sequelize_1.DataTypes.ENUM('active', 'inactive', 'lead'),
        defaultValue: 'lead',
    },
    tags: sequelize_1.DataTypes.STRING,
    notes: sequelize_1.DataTypes.TEXT,
}, {
    sequelize: connection_1.sequelize,
    tableName: 'contacts',
    timestamps: true,
});
Contact.belongsTo(Organization_1.default, { foreignKey: 'organizationId', as: 'organization' });
Organization_1.default.hasMany(Contact, { foreignKey: 'organizationId', as: 'contacts' });
exports.default = Contact;
