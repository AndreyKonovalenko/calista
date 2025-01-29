import { Types, Schema, model } from "mongoose";

export interface ICheckListItem {
  createrId: Types.ObjectId;
  checkListId?: Types.ObjectId;
  name: string;
  state: "complite" | "incomplite";
  pos: number;
}

export interface ICheckList {
  createrId: Types.ObjectId;
  boardId: Types.ObjectId;
  checkItems: Array<Types.ObjectId>;
  name: string;
}

export const CheckListSchema = new Schema<ICheckList>({
  createrId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
  checkItems: Array<Types.ObjectId>,
  name: { type: String, required: true },
});

export const ListModal = model<ICheckList>('CheckList', CheckListSchema);

export const CheckListItemSchema = new Schema<ICheckListItem>({
  createrId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  checkListId: { type:Schema.Types.ObjectId, ref: 'CheckList'},
  name: { type: String, required: true},
  state: { type: String, required: true},
  pos: {type: Number, required: true}
})
