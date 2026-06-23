"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
class Organization extends sequelize_1.Model {
}
exports.Organization = Organization;
Organization.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: { len: [1, 255] },
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        validate: { isEmail: true },
    },
    phone: sequelize_1.DataTypes.STRING,
    website: sequelize_1.DataTypes.STRING,
    address: sequelize_1.DataTypes.STRING,
    city: sequelize_1.DataTypes.STRING,
}, {
    sequelize: connection_1.sequelize,
    tableName: 'organizations',
    timestamps: true,
});
exports.default = Organization;
