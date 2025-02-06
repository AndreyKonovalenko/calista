import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';
import { TValidator } from '../middleware/validation-handler';
const joiPassoword = Joi.extend(joiPasswordExtendCore);

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
    username: Joi.string().alphanum().min(5).max(30).required().messages({
      'any.required': '{#label} is required',
      'string.empty': '{#label} cannot be empty',
      'string.min': '{#label} should be at least {#min} characters long.',
      'string.max': '{#label}should not exceed {#max} character',
      'string.alphanum':
        '{#label} should only contain alphanumeric characters. ',
    }),
    password: joiPassoword
      .string()
      .min(5)
      .minOfSpecialCharacters(1)
      .minOfLowercase(3)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .onlyLatinCharacters()
      .doesNotInclude(['password'])
      .messages({
        'string.min': '{#label} should be at least {#min} characters long ',
        'password.minOfUppercase':
          '{#label} should contain at least {#min} uppercase character',
        'password.minOfSpecialCharacters':
          '{#label} should contain at least {#min} special character',
        'password.minOfLowercase':
          '{#label} should contain at least {#min} lowercase character',
        'password.minOfNumeric':
          '{#label} should contain at least {#min} numeric character',
        'password.noWhiteSpaces': '{#label} should not contain white spaces',
        'password.onlyLatinCharacters':
          '{#label} should contain only latin characters',
        'password.doesNotInclude': '{#label} is too common',
      }),
  });
  return schema.validate(user);
};
