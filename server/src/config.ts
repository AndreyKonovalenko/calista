import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN;
export const NODE_ENV = process.env.NODE_ENV;
