import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomRequest } from '../middleware/protected';
import { findListByListId } from '../services/listService';
import { createList } from '../services/listService';
import { BoardModel, IBoard } from '../models/BoardModel';
import { HydratedDocument } from 'mongoose';
import { IList } from '../models/ListModel';
import { CustomError } from '../utils/CustomError';
import { MongooseError } from 'mongoose';

// POST: lists/
// Add new list

export const addList = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { user } = req as CustomRequest;
  const currentBoard: HydratedDocument<IBoard> | null =
    await BoardModel.findOne({ _id: req.body.board_id });
  if (!currentBoard) {
    throw new CustomError(
      `Board by id: ${req.body.board_id} not found`,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }

  if (currentBoard) {
    const list: IList = {
      createrId: user._id,
      boardId: req.body.boardId,
      name: req.body.title,
      cards: [],
      pos: req.body.pos,
    };
    try {
      const newList = await createList(list);
      const newListId = newList._id;
      // save to specific board by it id
      try {
        currentBoard.lists.push(newListId);
        await currentBoard.save();
        res
          .status(StatusCodes.OK)
          .json(
            `list id: ${newListId} added to board ${req.body.id} successfully`,
          );
      } catch (error) {
        if (error instanceof MongooseError && error.name === 'CastError') {
          next(
            new CustomError(
              `Board id: ${req.body.id} has not been updated with list id: ${newListId}`,
              StatusCodes.INTERNAL_SERVER_ERROR,
            ),
          );
        } else {
          next(error);
        }
      }
    } catch (error) {
      next(error);
    }
  }
};

// DELETE: lists/:id
type TDeleteOneResult = {
  acknowledged: boolean;
  deletedCount: number;
};

export const deleteList = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const list = await findListByListId(req.params.id);
  if (!list) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(getErrorMessage(`List by id: ${req.params.id} not found`));
  }
  if (list) {
    try {
      list
        .deleteOne()
        .then((result: TDeleteOneResult) => {
          if (result.deletedCount > 0) {
            res
              .status(StatusCodes.OK)
              .json(` list id: ${req.params.id} deleted`);
          } else {
            res
              .status(StatusCodes.OK)
              .json(` list id: ${req.params.id} not found `);
          }
        })
        .catch((error: unknown) => {
          res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(getErrorMessage(error));
        });
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getErrorMessage(error));
    }
  }
};
