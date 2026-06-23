import { sequelize } from './connection';
import '../models';

const cleanBackupTables = async (): Promise<void> => {
  const queryInterface = sequelize.getQueryInterface();
  const tables = await queryInterface.showAllTables();
  const backupTables = tables.filter((table) => typeof table === 'string' && table.endsWith('_backup')) as string[];

  for (const backupTable of backupTables) {
    console.log(`Removing stale backup table: ${backupTable}`);
    await queryInterface.dropTable(backupTable);
  }
};

export const initializeDatabase = async (): Promise<void> => {
  try {
    await cleanBackupTables();
    await sequelize.query('PRAGMA foreign_keys = OFF;');
    await sequelize.sync({ alter: true });
    await sequelize.query('PRAGMA foreign_keys = ON;');
    console.log('Database initialized successfully ✓');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export const closeDatabaseConnection = async (): Promise<void> => {
  try {
    await sequelize.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
};
