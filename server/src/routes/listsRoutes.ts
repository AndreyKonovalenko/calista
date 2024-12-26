import express from 'express';
import { addList } from '../controllers/listsControllser';

import { protect } from '../middleware/protected';

export const listsRouter = express.Router();
listsRouter.post("/", protect, addList)