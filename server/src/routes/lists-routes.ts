import express from 'express';
import { addList } from '../controllers/lists-controller';

import { protect } from '../middleware/protected';

export const listsRouter = express.Router();
listsRouter.post('/', protect, addList);
