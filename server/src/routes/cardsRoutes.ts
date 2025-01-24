import express from 'express';
import {
  addCard
} from '../controllers/cardsController';
import { protect } from '../middleware/protected';

export const cardsRouter = express.Router();
cardsRouter.post('/', protect, addCard);

