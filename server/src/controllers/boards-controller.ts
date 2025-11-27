import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HydratedDocument, DeleteResult } from 'mongoose';
import { CustomRequest } from '../middleware/protected';
import { IBoard } from '../models/BoardModel';
import {
  findBoards,
  deleteBoardById,
  cerateBoard,
  findBoardById,
  updateBoardById,
  findListsByBoardId,
  findCardsByBoardId,
  findChecklistItemsByBoardId,
} from '../services/boards-service';

// GET borads/
export const getBoards = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { user } = req as CustomRequest;
  try {
    const boards: Array<HydratedDocument<IBoard>> = await findBoards(user._id);
    res.status(StatusCodes.OK).json(boards);
  } catch (error) {
    next(error);
  }
};

// POST boards/
export const addBoard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { user } = req as CustomRequest;
  const data: IBoard = {
    name: req.body.name,
    createrId: user._id,
  };
  try {
    await cerateBoard(data);
    res.status(StatusCodes.OK).send(`board ${data.name} successfuly created`);
  } catch (error) {
    next(error);
  }
};

export const getBoard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const [board, lists, cards, checklistItems] = await Promise.all([
      findBoardById(req.params.id),
      findListsByBoardId(req.params.id), 
      findCardsByBoardId(req.params.id),
      findChecklistItemsByBoardId(req.params.id)
    ])
    const stat = Object.fromEntries(
      cards.map(element => {
        const filteredChecklistItems = checklistItems.filter(item => item.cardId.equals(element._id));
        return [
        element._id, {checklistItmes:{
          quantity: filteredChecklistItems.length,
          complite: filteredChecklistItems.filter(item=> item.state === 'complite').length
        }}
      ]
      } ),
    );
    if (!board) {
      res.status(StatusCodes.OK).send('Board not found');
    }
    if (board) {
      res.status(StatusCodes.OK).json({
        board: {
          _id: board._id,
          name: board.name,
          createrId: board.createrId,
        },
        lists: Object.fromEntries(lists.map(element => [element._id, element])),
        cards: Object.fromEntries(cards.map(element => [element._id, element])),
        stats: stat,
      });
    }
  } catch (error) {
    next(error);
  }
};

// PUT boards/:id
export const upatedBoard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = { ...req.body };
    await updateBoardById(req.params.id, data);
    res.status(StatusCodes.OK).send('board successfully updated');
  } catch (error) {
    next(error);
  }
};

// DELETE: boards/:id
export const deleteBoard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result: DeleteResult = await deleteBoardById(req.params.id);
    if (result.deletedCount > 0) {
      res.status(StatusCodes.OK).json(` board id: ${req.params.id} deleted`);
    } else {
      res.status(StatusCodes.OK).json(` board id: ${req.params.id} not found `);
    }
  } catch (err) {
    next(err);
  }
};
