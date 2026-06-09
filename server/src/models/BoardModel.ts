import { Types, Schema, model } from 'mongoose';

export interface IBoard {
  name: string;
  creatorId: Types.ObjectId;
}

const boardSchema = new Schema<IBoard>({
  creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
});

export const BoardModel = model<IBoard>('Board', boardSchema);
