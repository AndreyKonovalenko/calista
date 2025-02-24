import { BoardModel } from '../models/BoardModel';
import { IList, ListModel } from '../models/ListModel';
import { HydratedDocument, Types } from 'mongoose';
import { CustomError } from '../utils/CustomError';
import { StatusCodes } from 'http-status-codes';
import { CheckListItemModel, CheckListModel } from '../models/CheckListModel';
import { CardModel } from '../models/CardModel';

export async function createList(data: IList) {
  const board = await BoardModel.findById(data.boardId);
  if (!board) {
    throw new CustomError(
      `Board id: ${data.boardId} not found`,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
  if (board) {
    const list = await ListModel.create(data);
    board.lists.push(list._id);
    await board.save();
  }
}

// need to add list postion validation logic

export async function deleteListById(id: string) {
  await CheckListItemModel.deleteMany({ boardId: new Types.ObjectId(id) });
  await CheckListModel.deleteMany({ boardId: new Types.ObjectId(id) });
  await CardModel.deleteMany({ boardId: new Types.ObjectId(id) });
  return await ListModel.deleteOne({ _id: new Types.ObjectId(id) });
}

export type TDeleteOneResult = {
  acknowledged: boolean;
  deletedCount: number;
};

// export async function createList(
//   list: IList,
// ): Promise<HydratedDocument<IList>> {
//   const newList: HydratedDocument<IList> = await ListModel.create(list);
//   return newList;
// }

export async function findListByListId(
  id: string,
): Promise<HydratedDocument<IList> | null> {
  const list: HydratedDocument<IList> | null = await ListModel.findOne({
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
