import { Types } from 'mongoose';
import { ChecklistModel } from '../models/ChecklistModel';
import {
  IChecklistItem,
  ChecklistItemModel,
} from '../models/ChecklistItemMedel';
import { CustomError } from '../utils/CustomError';
import { StatusCodes } from 'http-status-codes';

export async function createChecklistItem(data: IChecklistItem) {
  const checklist = await ChecklistModel.findById(data.checklistId);
  if (!checklist) {
    throw new CustomError(
      `Checklist id: ${data.checklistId}`,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
  if (checklist) {
    await ChecklistItemModel.create(data);
  }
}

export async function findChecklistItemById(id: string) {
  return await ChecklistItemModel.findById(new Types.ObjectId(id));
}

export async function deleteCheckLisItemById(id: string) {
  return await ChecklistItemModel.deleteOne({ _id: new Types.ObjectId(id) });
}

export async function updateChecklistItemById(
  id: string,
  data: {
    [key: string]: string | Types.ObjectId | number;
  },
) {
  await ChecklistItemModel.findByIdAndUpdate(new Types.ObjectId(id), data, {
    new: true,
  });
}
