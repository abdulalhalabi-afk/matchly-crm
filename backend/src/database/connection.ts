import { Sequelize } from 'sequelize';
import path from 'path';

const dbPath = process.env.DATABASE_PATH || './db/crm.db';

// Stelle sicher, dass das db-Verzeichnis existiert
const dbDir = path.dirname(dbPath);
import fs from 'fs';
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

export default sequelize;
