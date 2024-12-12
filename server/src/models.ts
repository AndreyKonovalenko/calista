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
  title: string;
  description: string;
  complition: boolean;
}

const cardSchema = new Schema<ICard>({
  title: { type: String, required: true },
  description: { type: String },
  complition: { type: Boolean },
});
export const CardModal = model<ICard>('Card', cardSchema);

// list
export interface IList {
  title: string;
  creater_id: Types.ObjectId;
  cards: Array<Types.ObjectId>;
}

const listSchema = new Schema<IList>({
  title: { type: String, required: true },
  creater_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
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

export const BoardModal = model<IBoard>('Board', boardSchema);
