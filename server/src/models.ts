import { Schema, Types, model } from 'mongoose';
import bcrypt from 'bcrypt';

// user

export interface IUser {
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const saltRounds = 10;
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
  next();
});

export const UserModal = model<IUser>('User', userSchema);

// card
export interface ICard {
  creator_id: Types.ObjectId;
  list_id: Types.ObjectId;
  title: string;
  description: string;
  complition: boolean;
}

const cardSchema = new Schema<ICard>({
  creator_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  list_id: { type: Schema.Types.ObjectId, ref: 'List', required: true },
  title: { type: String, required: true },
  description: { type: String },
  complition: { type: Boolean },
});
export const CardModal = model<ICard>('Card', cardSchema);

// list
export interface IList {
  creater_id: Types.ObjectId;
  board_id: Types.ObjectId;
  title: string;
  cards: Array<Types.ObjectId>;
  position: number;
}

export const listSchema = new Schema<IList>({
  creater_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  board_id: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
  title: { type: String, required: true },
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
  position: { type: Number, required: true },
});

export const ListModal = model<IList>('List', listSchema);

// board
export interface IBoard {
  title: string;
  creater_id: Types.ObjectId;
  lists: Array<Types.ObjectId>;
}
// need to rewrite TBoard to Board Document

const boardSchema = new Schema<IBoard>({
  title: { type: String, required: true },
  creater_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lists: [{ type: Schema.Types.ObjectId, ref: 'List' }],
});
// boardSchema.pre('deleteOne', (next) => {
//   const err = new Error('somthing went wrong')
//   next(err)
// })

export const BoardModal = model<IBoard>('Board', boardSchema);
