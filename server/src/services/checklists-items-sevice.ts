import { Types } from 'mongoose';
import { ChecklistModel } from '../models/ChecklistModel';
import {
  IChecklistItem,
  ChecklistItemModel,
} from '../models/ChecklistItemMedel';
import { CustomError } from '../utils/CustomError';
import { StatusCodes } from 'http-status-codes';
import { ascendingComparator } from '../utils/utils';

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
  if ( 'action' in data) {
    if(data.action === 'renumbering'){
      const checklistItems = await ChecklistItemModel.find({
        checklistId: new Types.ObjectId(id)
      }).select(['pos']);
      if(checklistItems.length > 0) {
        checklistItems.sort(ascendingComparator);
        let position = 16384;
        for (const element of checklistItems){
          await ChecklistItemModel.findByIdAndUpdate(
            new Types.ObjectId(element._id),
            {pos: position},
            {new: true}
          );
          position += 16348
        }
      }
    }
  } else {
    await ChecklistItemModel.findByIdAndUpdate(new Types.ObjectId(id), data, {
      new: true,
    });
  }
}
