import { Types, Schema, model } from 'mongoose';

export interface ICard {
  createrId: Types.ObjectId;
  boardId: Types.ObjectId;
  listId: Types.ObjectId;
  name: string;
  description?: string;
  checkLists: Array<Types.ObjectId>;
  pos: number;
}

const cardSchema = new Schema<ICard>({
  boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
  createrId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String },
  listId: { type: Schema.Types.ObjectId, ref: 'List', required: true },
  checkLists: [{ type: Schema.Types.ObjectId, ref: 'CheckList' }],
  pos: { type: Number, required: true },
  name: { type: String, required: true },
});

export const CardModel = model<ICard>('Card', cardSchema);
