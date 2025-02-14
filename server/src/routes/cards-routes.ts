import express from 'express';
import { addCard } from '../controllers/cards-controller';
import { protect } from '../middleware/protected';

export const cardsRouter = express.Router();
cardsRouter.post('/', protect, addCard);
