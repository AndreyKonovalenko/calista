import { Types, Schema, model } from "mongoose";

export interface ICard {
  creater_id: Types.ObjectId;
  board_id: Types.ObjectId;
  list_id: Types.ObjectId;
  name: string;
  description: string;
  pos: number
}

const cardSchema = new Schema<ICard>({
  board_id: {type: Schema.Types.ObjectId, ref: 'Board', required: true},
  creater_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String },
  list_id: { type: Schema.Types.ObjectId, ref: 'List', required: true },
  name: { type: String, required: true },
});

export const CardModal = model<ICard>('Card', cardSchema);

