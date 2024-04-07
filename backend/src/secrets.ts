import dotenv from 'dotenv'
dotenv.config();
export const REDIS_URL = process.env.REDIS_URL;
export const DATA_API_KEY = process.env.DATA_API_KEY
export const JIO_SAAVN_API = process.env.JIO_SAAVN_API;