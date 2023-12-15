import { config } from 'dotenv';
config();

export const PORT = process.env.PORT
export const LOCALHOST = process.env.LOCALHOST
export const MONGODB_URI = process.env.MONGODB_URI