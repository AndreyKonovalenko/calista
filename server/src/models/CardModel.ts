import { Types, Schema, model } from 'mongoose';

export interface ICard {
  createrId: Types.ObjectId;
  boardId: Types.ObjectId;
  listId: Types.ObjectId;
  name: string;
  description: string;
  checkList?: Types.ObjectId | null;
  pos: number;
}

const cardSchema = new Schema<ICard>({
  boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
  createrId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String },
  listId: { type: Schema.Types.ObjectId, ref: 'List', required: true },
  checkList: {type: Schema.Types.ObjectId, ref: "CheckList", default: null}
});

export const CardModal = model<ICard>('Card', cardSchema);
