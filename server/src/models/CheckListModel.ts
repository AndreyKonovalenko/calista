import { Types, Schema, model } from 'mongoose';

export interface ICheckList {
  createrId: Types.ObjectId;
  boardId: Types.ObjectId;
  cardId: Types.ObjectId;
  checkItems: Array<Types.ObjectId>;
  name: string;
}

export interface ICheckListItem {
  createrId: Types.ObjectId;
  checkListId?: Types.ObjectId;
  boardId: Types.ObjectId;
  name: string;
  state: 'complite' | 'incomplite';
  pos: number;
}

export const CheckListSchema = new Schema<ICheckList>({
  createrId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
  cardId: { type: Schema.Types.ObjectId, ref: 'Card', required: true },
  checkItems: Array<Types.ObjectId>,
  name: { type: String, required: true },
});

export const CheckListItemSchema = new Schema<ICheckListItem>({
  createrId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  checkListId: { type: Schema.Types.ObjectId, ref: 'CheckList' },
  boardId: { type: Schema.Types.ObjectId, ref: 'Board' },
  name: { type: String, required: true },
  state: { type: String, required: true },
  pos: { type: Number, required: true },
});

export const CheckListItemModel = model<ICheckListItem>(
  'CheckListItem',
  CheckListItemSchema,
);
export const CheckListModel = model<ICheckList>('CheckList', CheckListSchema);
