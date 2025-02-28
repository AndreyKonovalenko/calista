import { Types, Schema, model } from 'mongoose';

export interface IBoard {
  name: string;
  createrId: Types.ObjectId;
  lists: Array<Types.ObjectId>;
}

const boardSchema = new Schema<IBoard>({
  createrId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lists: [{ type: Schema.Types.ObjectId, ref: 'List' }],
  name: { type: String, required: true },
});

export const BoardModel = model<IBoard>('Board', boardSchema);
