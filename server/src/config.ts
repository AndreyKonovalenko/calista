import dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';

const envFound = dotenv.config({ path: '../.env' });

if (envFound.error) {
  throw new Error('no .env file found');
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
  nodeEnv: process.env.NODE_ENV,
  app: {
    port: parseInt(<string>process.env.PORT, 10) || 3000,
    jwtSecret: <Secret>process.env.JWT_SECRET,
    tokenExpiresIn: process.env.TOKEN_EXPIRES_IN,
  },
  mongodb: {
    mongoUri: process.env.MONGO_URI,
    dbName: process.env.MONGO_DB,
  },
};
