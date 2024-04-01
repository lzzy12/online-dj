import dotenv from 'dotenv'
dotenv.config();
export const REDIS_URL = process.env.REDIS_URL;
export const DATA_API_KEY = process.env.DATA_API_KEY