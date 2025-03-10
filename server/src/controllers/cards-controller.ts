import { NextFunction, Request, Response } from 'express';
import { ICard } from '../models/CardModel';
import { StatusCodes } from 'http-status-codes';
import { CustomRequest } from '../middleware/protected';
import {
  createCard,
  deletedCardById,
  findCardById,
  updateCardById,
} from '../services/cards-service';
import { DeleteResult } from 'mongoose';

// POST cards/ @pirvate
// Add new card
export const addCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { user } = req as CustomRequest;
  const data: ICard = {
    createrId: user._id,
    boardId: req.body.boardId,
    listId: req.body.listId,
    name: req.body.name,
    checkLists: [],
    pos: req.body.pos ? req.body.pos : 16384,
  };
  try {
    await createCard(data);
    res.status(StatusCodes.OK).send(`card ${data.name} successuly created`);
  } catch (error) {
    next(error);
  }
};

// GET cards/:id @private
export const getCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const card = await findCardById(req.params.id);
    if (!card) {
      res.status(StatusCodes.OK).send('Card not found');
    }
    if (card) {
      res.status(StatusCodes.OK).json(card);
    }
  } catch (error) {
    next(error);
  }
};

// PUT cards/:id @private
export const updateCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = { ...req.body };
    await updateCardById(req.params.id, data);
    res.status(StatusCodes.OK).send('Card successfuly updated');
  } catch (error) {
    next(error);
  }
};
// DELETE: cards/:id @private
export const deleteCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result: DeleteResult = await deletedCardById(req.params.id);
    if (result.deletedCount > 0) {
      res.status(StatusCodes.OK).send(`card id: ${req.params.id} deleted`);
    } else {
      res.status(StatusCodes.OK).send(`card id: ${req.params.id} not found `);
    }
  } catch (error) {
    next(error);
  }
};
