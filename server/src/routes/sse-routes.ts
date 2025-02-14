import express from 'express';
import { protect } from '../middleware/protected';
import { connectToSse } from '../controllers/sse-controller';

export const sseRouter = express.Router();
sseRouter.get('/', protect, connectToSse);
