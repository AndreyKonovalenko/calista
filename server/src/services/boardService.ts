import { BoardModal, IBoard } from '../models';
import { Types, HydratedDocument } from 'mongoose';

export async function createBoard(
  board: IBoard,
): Promise<HydratedDocument<IBoard>> {
  const newBoard: HydratedDocument<IBoard> = await BoardModal.create(board);
  return newBoard;
}

export async function findBoardsByCreaterId(
  id: Types.ObjectId,
): Promise<Array<HydratedDocument<IBoard>>> {
  const boards: Array<HydratedDocument<IBoard>> = await BoardModal.find({
    creater_id: id,
  });
  return boards;
}

export async function findBoardByBoardId(
  id: string,
): Promise<HydratedDocument<IBoard> | null> {
  const board: HydratedDocument<IBoard> | null = await BoardModal.findOne({
    _id: id,
  });
  return board;
}

