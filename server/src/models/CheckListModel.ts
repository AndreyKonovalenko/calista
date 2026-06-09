import { Types, Schema, model } from 'mongoose';

export interface IChecklist {
  creatorId: Types.ObjectId;
  boardId: Types.ObjectId;
  listId: Types.ObjectId;
  cardId: Types.ObjectId;
  name: string;
  pos: number;
}

const checklistSchema = new Schema<IChecklist>({
  creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
  listId: { type: Schema.Types.ObjectId, ref: 'List', required: true },
  cardId: { type: Schema.Types.ObjectId, ref: 'Card', required: true },
  name: { type: String, required: true },
  pos: { type: Number, required: true },
});

export const ChecklistModel = model<IChecklist>('Checklist', checklistSchema);
