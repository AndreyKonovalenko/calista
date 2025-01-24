import { NextFunction, Request, Response } from 'express';
import { CardModal, ICard, ICheckList } from '../models';
import { StatusCodes } from 'http-status-codes';

// POST /cards @pirvate 

export const addCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const data: ICard = {
      board_id: req.body.board_id,
      list_id: req.body.list_id,
      name: req.body.name,
      description: ""
  }
  try {
    const card = await CardModal.create(data)
    res.status(StatusCodes.OK).json(card)
  } catch(error) {
      next(error)
  }
}

  // board_id: Types.ObjectId;
  // card_id: Types.ObjectId;
  // pos: number;
  // checkItems: Array<ICheckItem>

// POST /cards/:id/checklist/:id/:name
// export const addCheckList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   const 

// }