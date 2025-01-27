import { Types, Schema, model } from "mongoose";

export interface IList {
  creater_id: Types.ObjectId;
  board_id: Types.ObjectId;
  name: string;
  cards: Array<Types.ObjectId>;
  pos: number;
}

export const listSchema = new Schema<IList>({
  board_id: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
  creater_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  pos: { type: Number, required: true },
  name: { type: String, required: true },
});

export const ListModal = model<IList>('List', listSchema);
