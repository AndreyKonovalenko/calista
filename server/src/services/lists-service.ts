import { BoardModel } from '../models/BoardModel';
import { IList, ListModel } from '../models/ListModel';
import { Types } from 'mongoose';
import { CustomError } from '../utils/CustomError';
import { StatusCodes } from 'http-status-codes';
import { ChecklistModel } from '../models/ChecklistModel';
import { ChecklistItemModel } from '../models/ChecklistItemMedel';
import { CardModel } from '../models/CardModel';
import { ascendingComparator } from '../utils/utils';

export async function createList(data: IList) {
  const board = await BoardModel.findById(data.boardId);
  if (!board) {
    throw new CustomError(
      `Board id: ${data.boardId} not found`,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
  if (board) {
    await ListModel.create(data);
  }
}

export async function findListById(id: string) {
  return await ListModel.findById(new Types.ObjectId(id));
}

export async function deleteListById(id: string) {
  await ChecklistItemModel.deleteMany({ listId: new Types.ObjectId(id) });
  await ChecklistModel.deleteMany({ listId: new Types.ObjectId(id) });
  await CardModel.deleteMany({ listId: new Types.ObjectId(id) });
  return await ListModel.deleteOne({ _id: new Types.ObjectId(id) });
}

export async function updateListById(
  id: string,
  data: {
    [key: string]: string | Types.ObjectId | Array<Types.ObjectId> | number;
  },
) {
  if ('action' in data) {
    if (data.action === 'renumbering') {
      const cards = await CardModel.find({
        listId: new Types.ObjectId(id),
      }).select(['pos']);
      if (cards.length > 0) {
        cards.sort(ascendingComparator);
        let position = 16384;
        for (const element of cards) {
          await CardModel.findByIdAndUpdate(
            new Types.ObjectId(element._id),
            { pos: position },
            { new: true },
          );
          position = position + 16348;
        }
      }
    }
  } else {
    await ListModel.findByIdAndUpdate(new Types.ObjectId(id), data, {
      new: true,
    });
  }
}
