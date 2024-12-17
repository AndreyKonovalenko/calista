import express from 'express';
import { protect } from '../middleware/protected';
import { connectToSse } from '../controllers/sseController';

export const sseRouter = express.Router();
sseRouter.get('/', protect, connectToSse);
