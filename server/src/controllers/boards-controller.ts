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
  findChecklistsByBoardId,
} from '../services/boards-service';
import { asyncHandler } from '../utils/async-handler';

// GET borads/
export const getBoards = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { user } = req as CustomRequest;
    const boards: Array<HydratedDocument<IBoard>> = await findBoards(user._id);
    res.status(StatusCodes.OK).json(boards);
  },
);

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
    const [board, lists, cards, checklistItems, checklists] = await Promise.all(
      [
        findBoardById(req.params.id),
        findListsByBoardId(req.params.id),
        findCardsByBoardId(req.params.id),
        findChecklistItemsByBoardId(req.params.id),
        findChecklistsByBoardId(req.params.id),
      ],
    );
    if (!board) {
      res.status(StatusCodes.OK).json({ message: 'Board not found' });
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
        checklistItems: Object.fromEntries(
          checklistItems.map(element => [element._id, element]),
        ),
        checklists: Object.fromEntries(
          checklists.map(element => [element._id, element]),
        ),
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
