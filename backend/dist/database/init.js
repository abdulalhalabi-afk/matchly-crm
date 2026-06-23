"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDatabaseConnection = exports.initializeDatabase = void 0;
const connection_1 = require("./connection");
require("../models");
const cleanBackupTables = async () => {
    const queryInterface = connection_1.sequelize.getQueryInterface();
    const tables = await queryInterface.showAllTables();
    const backupTables = tables.filter((table) => typeof table === 'string' && table.endsWith('_backup'));
    for (const backupTable of backupTables) {
        console.log(`Removing stale backup table: ${backupTable}`);
        await queryInterface.dropTable(backupTable);
    }
};
const initializeDatabase = async () => {
    try {
        await cleanBackupTables();
        await connection_1.sequelize.query('PRAGMA foreign_keys = OFF;');
        await connection_1.sequelize.sync({ alter: true });
        await connection_1.sequelize.query('PRAGMA foreign_keys = ON;');
        console.log('Database initialized successfully ✓');
    }
    catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
};
exports.initializeDatabase = initializeDatabase;
const closeDatabaseConnection = async () => {
    try {
        await connection_1.sequelize.close();
        console.log('Database connection closed');
    }
    catch (error) {
        console.error('Error closing database connection:', error);
    }
};
exports.closeDatabaseConnection = closeDatabaseConnection;
