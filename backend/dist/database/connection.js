"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const path_1 = __importDefault(require("path"));
const dbPath = process.env.DATABASE_PATH || './db/crm.db';
// Stelle sicher, dass das db-Verzeichnis existiert
const dbDir = path_1.default.dirname(dbPath);
const fs_1 = __importDefault(require("fs"));
if (!fs_1.default.existsSync(dbDir)) {
    fs_1.default.mkdirSync(dbDir, { recursive: true });
}
exports.sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
});
exports.default = exports.sequelize;
