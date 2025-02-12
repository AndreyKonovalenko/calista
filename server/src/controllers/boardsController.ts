import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {  HydratedDocument, DeleteResult } from 'mongoose';
import { CustomRequest } from '../middleware/protected';
import { BoardModel, IBoard } from '../models/BoardModel';
import boardsService from '../services/boardsService';
// GET: borads/
export const getBoards = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { user } = req as CustomRequest;
  try {
    const boards: Array<HydratedDocument<IBoard>> | [] =
      await boardsService.getBoards(user._id);
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
    const newBoard: HydratedDocument<IBoard> = await BoardModel.create(board);
    res.status(StatusCodes.OK).json(newBoard);
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
    const result:DeleteResult = await boardsService.deleteBoardById(req.params.id)
    if (result.deletedCount > 0) {
      res.status(StatusCodes.OK).json(` board id: ${req.params.id} deleted`);
    } else {
      res.status(StatusCodes.OK).json(` board id: ${req.params.id} not found `);
    }
  } catch(err){
    next(err)
  }
}

// need to create method o deleting board and all nested lista and cards