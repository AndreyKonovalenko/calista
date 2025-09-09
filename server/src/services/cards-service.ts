import { StatusCodes } from 'http-status-codes';
import { CardModel, ICard } from '../models/CardModel';
import { ListModel } from '../models/ListModel';
import { CustomError } from '../utils/CustomError';
import { Types } from 'mongoose';
import { ChecklistModel } from '../models/ChecklistModel';
import { ChecklistItemModel } from '../models/ChecklistItemMedel';

export async function createCard(data: ICard) {
  const list = await ListModel.findById(data.listId);
  if (!list) {
    throw new CustomError(
      `list id ${data.listId} not found`,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
  if (list) {
    await CardModel.create(data);
  }
}

export async function findCardById(id: string) {
  return await CardModel.findById(new Types.ObjectId(id));
}

export async function findChecklistsByCardId(id: string) {
  return await ChecklistModel.find({ cardId: new Types.ObjectId(id) });
}

export async function findChecklistItemsByCardId(id: string) {
  return await ChecklistItemModel.find({ cardId: new Types.ObjectId(id) });
}

export async function deletedCardById(id: string) {
  await ChecklistItemModel.deleteMany({ cardId: new Types.ObjectId(id) });
  await ChecklistModel.deleteMany({ cardId: new Types.ObjectId(id) });
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
