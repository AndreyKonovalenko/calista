import { Types, Schema, model } from 'mongoose';

export interface IList {
  createrId: Types.ObjectId;
  boardId: Types.ObjectId;
  name: string;
  cards: Array<Types.ObjectId>;
  pos: number;
}

export const listSchema = new Schema<IList>({
  boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
  createrId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  pos: { type: Number, required: true },
  name: { type: String, required: true },
});

export const ListModel = model<IList>('List', listSchema);
