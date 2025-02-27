import express from 'express';
import { addCard, deleteCard, getCard, updateCard } from '../controllers/cards-controller';
import { protect } from '../middleware/protected';

export const cardsRouter = express.Router();
cardsRouter.post('/', protect, addCard);
cardsRouter.get('/:id', protect, getCard);
cardsRouter.put('/:id', protect, updateCard);
cardsRouter.delete('/:id', protect, deleteCard)
