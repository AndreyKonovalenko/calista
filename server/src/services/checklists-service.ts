import { Types } from 'mongoose';
import { CustomError } from '../utils/CustomError';
import { StatusCodes } from 'http-status-codes';
import { ChecklistModel, IChecklist } from '../models/ChecklistModel';
import { ChecklistItemModel } from '../models/ChecklistItemMedel';
import { CardModel } from '../models/CardModel';

export async function createChecklist(data: IChecklist) {
  const card = await CardModel.findById(data.cardId);
  if (!card) {
    throw new CustomError(
      `Card id: ${data.boardId} not found`,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
  if (card) {
    await ChecklistModel.create(data);
  }
}

export async function findChecklistById(id: string) {
  return await ChecklistModel.findById(new Types.ObjectId(id));
}

export async function deleteChecklistById(id: string) {
  await ChecklistItemModel.deleteMany({ checklistId: new Types.ObjectId(id) });
  return await ChecklistModel.deleteOne({ _id: new Types.ObjectId(id) });
}

export async function updateChecklistById(
  id: string,
  data: {
    [key: string]: string | Types.ObjectId | number;
  },
) {
  await ChecklistModel.findByIdAndUpdate(new Types.ObjectId(id), data, {
    new: true,
  });
}
