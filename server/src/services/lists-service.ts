import { BoardModel } from '../models/BoardModel';
import { IList, ListModel } from '../models/ListModel';
import { Types } from 'mongoose';
import { CustomError } from '../utils/CustomError';
import { StatusCodes } from 'http-status-codes';
import { CheckListItemModel, CheckListModel } from '../models/CheckListModel';
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
    const list = await ListModel.create(data);
    board.lists.push(list._id);
    await board.save();
  }
}

export async function findListById(id: string) {
  return await ListModel.findById(new Types.ObjectId(id)).populate({
    path: 'cards',
    populate: {
      path: 'checkLists',
      select: 'name',
    },
  });
}

export async function deleteListById(id: string) {
  const list = await ListModel.findById(new Types.ObjectId(id));
  const board = await BoardModel.findById(list?.boardId);
  if (board) {
    board.lists = board.lists.filter(element => {
      return element.equals(new Types.ObjectId(id)) === false;
    });
    board.save();
  }
  await CheckListItemModel.deleteMany({ listId: new Types.ObjectId(id) });
  await CheckListModel.deleteMany({ listId: new Types.ObjectId(id) });
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
      const list = await ListModel.findById(new Types.ObjectId(id))
        .populate<{ cards: { _id: Types.ObjectId; pos: number }[] }>({
          path: 'cards',
          select: ['pos'],
        })
        .exec();
      if (list && list.cards.length > 0) {
        const sortableList = list.cards;
        sortableList.sort(ascendingComparator);
        let position = 16384;
        for (const element of sortableList) {
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
