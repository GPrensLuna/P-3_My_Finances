import { config } from 'dotenv';
config();

export const PORT = process.env.PORT
export const LOCALHOST = process.env.LOCALHOST
export const MONGO_URL = process.env.MONGO_URL