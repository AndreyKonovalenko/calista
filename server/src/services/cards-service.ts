import { StatusCodes } from 'http-status-codes';
import { CardModel, ICard } from '../models/CardModel';
import { ListModel } from '../models/ListModel';
import { CustomError } from '../utils/CustomError';
import { Types } from 'mongoose';
import { CheckListItemModel, CheckListModel } from '../models/CheckListModel';

export async function createCard(data: ICard) {
  const list = await ListModel.findById(data.listId);
  if (!list) {
    throw new CustomError(
      `list id ${data.listId} not found`,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
  if (list) {
    const card = await CardModel.create(data);
    list.cards.push(card._id);
    await list.save();
  }
}

export async function findCardById(id: string) {
  return await CardModel.findById(new Types.ObjectId(id)).populate({
    path: 'checkLists',
    select: 'name',
  });
}

export async function deletedCardById(id: string) {
  const card = await CardModel.findById(new Types.ObjectId(id));
  const list = await ListModel.findById(card?.listId);
  if (list) {
    list.cards = list.cards.filter(element => {
      return element.equals(new Types.ObjectId(id)) === false;
    });
    list.save();
  }
  await CheckListItemModel.deleteMany({ cardId: new Types.ObjectId(id) });
  await CheckListModel.deleteMany({ cardId: new Types.ObjectId(id) });
  return await CardModel.deleteOne({ _id: new Types.ObjectId(id) });
}

export async function updateCardById(
  id: string,
  data: {
    [key: string]: string | Types.ObjectId | Array<Types.ObjectId> | number;
  },
) {
  await CardModel.findByIdAndUpdate(new Types.ObjectId(id), data, {
    new: true,
  });
}
