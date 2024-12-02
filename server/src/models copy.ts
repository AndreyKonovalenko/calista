import mongoose, { Schema, Types } from 'mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';

// user

export type TUser = {
	username: string;
	password: string;
};

export type TUserDoument = TUser & mongoose.Document;
type TUserModal = Model<TUserDoument>;

const userSchema = new Schema<TUserDoument, TUserModal>({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

const saltRounds = 10;
userSchema.pre('save', async function (next) {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, saltRounds);
	}
	next();
});
export const UserModal: TUserModal = mongoose.model<TUserDoument, TUserModal>(
	'User',
	userSchema
);

// card
export type TCard = {
	title: string;
	description: string;
	complition: boolean;
};

export type TCardDocument = TCard & mongoose.Document;
type TCardModal = Model<TCardDocument>;

const cardSchema = new Schema<TCardDocument, TCardModal>({
	title: { type: String, required: true },
	description: { type: String },
	complition: { type: Boolean },
});
export const CardModal = mongoose.model<TCardDocument, TCardModal>(
	'Card',
	cardSchema
);

// list
export type TList = {
	title: string;
	creater_id: Types.ObjectId;
	cards: Array<Types.ObjectId>;
};
export type TListDocument = TList & mongoose.Document;

type TListModel = Model<TListDocument>;
const listSchema = new Schema<TListDocument, TListModel>({
    title: { type: String, required: true },
    creater_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cards: [{type: Schema.Types.ObjectId, ref: 'Card'}] 
  }
)
export const ListModal = mongoose.model<TListDocument, TListModel>(
	'List',
	listSchema
);

// board
export type TBoard = {
	title: string;
	creater_id: Types.ObjectId;
	lists: Array<Types.ObjectId>;
};
// need to rewrite TBoard to Board Document
export type TBoardDocument = TBoard & mongoose.Document;
type TBoardModel = Model<TBoardDocument>;

const boardSchema = new Schema<TBoardDocument, TBoardModel>({
	title: { type: String, required: true },
	creater_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	lists:[{ type: Schema.Types.ObjectId, ref: 'List' }]
});

export const BoardModal = mongoose.model<TBoardDocument, TBoardModel>(
	'Board',
	boardSchema
);
