import { Types, Schema, model } from "mongoose";

export interface IBoard {
  title: string;
  creater_id: Types.ObjectId;
  lists: Array<Types.ObjectId>;
}

const boardSchema = new Schema<IBoard>({
  creater_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lists: [{ type: Schema.Types.ObjectId, ref: 'List' }],
  title: { type: String, required: true },
});

export const BoardModel = model<IBoard>('Board', boardSchema);
