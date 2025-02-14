import { BoardModel } from '../models/BoardModel';
import { IList, ListModal } from '../models/ListModel';
import { HydratedDocument, Types } from 'mongoose';
import { CustomError } from '../utils/CustomError';
import { StatusCodes } from 'http-status-codes';

export type TDeleteOneResult = {
  acknowledged: boolean;
  deletedCount: number;
};

export async function createList(
  list: IList,
): Promise<HydratedDocument<IList>> {
  const newList: HydratedDocument<IList> = await ListModal.create(list);
  return newList;
}

export async function findListByListId(
  id: string,
): Promise<HydratedDocument<IList> | null> {
  const list: HydratedDocument<IList> | null = await ListModal.findOne({
    _id: id,
  });
  return list;
}

export const addListIdToBoard = async (
  boardId: Types.ObjectId,
  listId: Types.ObjectId,
) => {
  try {
    const board = await BoardModel.findById({ boardId });
    if (!board) {
      throw new CustomError(
        `Board id: ${boardId} not found`,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
    board.lists.push(listId);
    await board.save();
  } catch (error) {
    console.log(error);
  }
};
