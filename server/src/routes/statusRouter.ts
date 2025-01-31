import express from 'express';
import { serverStatus } from '../controllers/statusController';

export const statusRouter = express.Router();
statusRouter.get('/', serverStatus);
