import mongoose from 'mongoose';
import { MONGO_URL } from './config.js';

mongoose.connect(MONGO_URL);

process.on('deprecation', (warning) => {
  console.warn(warning);
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Error connecting to the database:', error);
});

db.once('open', () => {
  console.log('Database is connected to:', db.name);
});
