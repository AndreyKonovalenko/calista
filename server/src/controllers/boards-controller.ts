import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HydratedDocument, DeleteResult } from 'mongoose';
import { CustomRequest } from '../middleware/protected';
import { IBoard } from '../models/BoardModel';
import {findBoards, deleteBoardById, cerateBoard, findBoardById} from '../services/boards-service';
// GET: borads/
export const getBoards = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { user } = req as CustomRequest;
  try {
    const boards: Array<HydratedDocument<IBoard>> | [] =
      await findBoards(user._id);
    res.status(StatusCodes.OK).json(boards);
  } catch (error) {
    next(error);
  }
};

// POST: boards/
export const addBoard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { user } = req as CustomRequest;
  const board: IBoard = {
    title: req.body.title,
    createrId: user._id,
    lists: [],
  };
  try {
    await cerateBoard(board);
    res.status(StatusCodes.OK).send(`board ${board.title} successfuly created`);
  } catch (error) {
    next(error);
  }
};

// GET: boards/id

export const getBoard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const board = await findBoardById(req.params.id)
    if (board) {
      res.status(StatusCodes.OK).json(board)
    }
    if (!board) {
      res.status(StatusCodes.OK).send("Board not found")
    }
  } catch(error){
    next(error)
  }

}

// DELETE: boards/:id
export const deleteBoard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result: DeleteResult = await deleteBoardById(
      req.params.id,
    );
    if (result.deletedCount > 0) {
      res.status(StatusCodes.OK).json(` board id: ${req.params.id} deleted`);
    } else {
      res.status(StatusCodes.OK).json(` board id: ${req.params.id} not found `);
    }
  } catch (err) {
    next(err);
  }
};

// need to create method o deleting board and all nested lista and cards
