import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import { TValidator } from '../middleware/validate-handler';

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

export const validateUser: TValidator<IUser> = (user: IUser) => {
  const schema = Joi.object({
    username: Joi.string().min(5).max(20).required(),

    password: Joi.string().pattern(
      new RegExp('/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm'),
    ),
  });
  return schema.validate(user);
};
