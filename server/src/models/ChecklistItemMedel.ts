import { Types, Schema, model } from 'mongoose';

export interface IChecklistItem {
  createrId: Types.ObjectId;
  checklistId: Types.ObjectId;
  boardId: Types.ObjectId;
  listId: Types.ObjectId;
  cardId: Types.ObjectId;
  name: string;
  state: 'complete' | 'incomplete';
  pos: number;
}

const checklistItemSchema = new Schema<IChecklistItem>({
  createrId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  checklistId: {
    type: Schema.Types.ObjectId,
    ref: 'Checklist',
    required: true,
  },
  boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
  cardId: { type: Schema.Types.ObjectId, ref: 'Card', requierd: true },
  listId: { type: Schema.Types.ObjectId, ref: 'List', required: true },
  name: { type: String, required: true },
  state: { type: String, required: true },
  pos: { type: Number, required: true },
});

export const ChecklistItemModel = model<IChecklistItem>(
  'ChecklistItem',
  checklistItemSchema,
);
