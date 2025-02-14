import { NextFunction, Request, Response } from 'express';
import { CardModal, ICard } from '../models/CardModel';
import { StatusCodes } from 'http-status-codes';
import { CustomRequest } from '../middleware/protected';

// POST /cards @pirvate

export const addCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { user } = req as CustomRequest;
  const data: ICard = {
    createrId: user._id,
    boardId: req.body.board_id,
    listId: req.body.list_id,
    name: req.body.name,
    description: req.body.description,
    pos: req.body.pos,
  };
  try {
    const card = await CardModal.create(data);
    res.status(StatusCodes.OK).json(card);
  } catch (error) {
    next(error);
  }
};

// board_id: Types.ObjectId;
// card_id: Types.ObjectId;
// pos: number;
// checkItems: Array<ICheckItem>

// POST /cards/:id/checklist/:id/:name
// export const addCheckList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   const

// }
