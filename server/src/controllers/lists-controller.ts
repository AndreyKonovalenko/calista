import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomRequest } from '../middleware/protected';
import { findListByListId } from '../services/lists-service';
import { createList } from '../services/lists-service';
import { IList } from '../models/ListModel';


// POST: lists/
// Add new list


export const addList = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { user } = req as CustomRequest;
    const list: IList = {
      createrId: user._id,
      boardId: req.body.boardId,
      name: req.body.title,
      cards: [],
      pos: req.body.pos,
    };
    try {
      await createList(list);
      res.send(StatusCodes.OK).send(`list ${list.name} successfuly created`);    
    } catch (error) {
      next(error);
    }
  }



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
