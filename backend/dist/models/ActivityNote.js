"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityNote = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
const Contact_1 = __importDefault(require("./Contact"));
class ActivityNote extends sequelize_1.Model {
}
exports.ActivityNote = ActivityNote;
ActivityNote.init({
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
        onDelete: 'CASCADE',
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('call', 'email', 'meeting', 'note', 'task'),
        defaultValue: 'note',
    },
}, {
    sequelize: connection_1.sequelize,
    tableName: 'activity_notes',
    timestamps: true,
});
ActivityNote.belongsTo(Contact_1.default, { foreignKey: 'contactId', as: 'contact' });
Contact_1.default.hasMany(ActivityNote, { foreignKey: 'contactId', as: 'activities' });
exports.default = ActivityNote;
