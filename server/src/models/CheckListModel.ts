import { Types, Schema, model } from "mongoose";

export interface ICheckListItem {
  creater_id: Types.ObjectId;
  checkList_id?: Types.ObjectId;
  name: string;
  state: "complite" | "incomplite";
  pos: number;
}

export interface ICheckList {
  creater_id: Types.ObjectId;
  board_id: Types.ObjectId;
  checkItems: Array<Types.ObjectId>;
  name: string;
}

export const CheckListSchema = new Schema<ICheckList>({
  creater_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  board_id: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
  checkItems: Array<Types.ObjectId>,
  name: { type: String, required: true },
});

export const ListModal = model<ICheckList>('CheckList', CheckListSchema);

export const CheckListItemSchema = new Schema<ICheckListItem>({
  creater_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  checkList_id: { type:Schema.Types.ObjectId, ref: 'CheckList'},
  name: { type: String, required: true},
  state: { type: String, required: true},
  pos: {type: Number, required: true}
})
