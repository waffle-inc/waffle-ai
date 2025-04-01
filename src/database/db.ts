import mongoose from 'mongoose';
import config from '../config';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(`mongodb://${config.database.url}:${config.database.port}/${config.database.database}`, {
        user: config.database.name,
        pass: config.database.password,
    });
    console.log('MongoDB подключена');
  } catch (error) {
    console.error('Ошибка подключения к MongoDB:', error);
    process.exit(1);
  }
};
