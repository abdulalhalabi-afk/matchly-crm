import { sequelize } from './connection';
import '../models';

export const initializeDatabase = async (): Promise<void> => {
  try {
    // Synchronize models with database
    await sequelize.sync({ alter: true });
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
