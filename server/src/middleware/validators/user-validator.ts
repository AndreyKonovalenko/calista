import Joi, { CustomValidator } from 'joi';
import { joiPasswordExtendCore } from 'joi-password';
import { IUser } from '../../models/UserModel';
import customErrorMessages from './custom-error-messages';

const joiPassoword = Joi.extend(joiPasswordExtendCore);

const method: CustomValidator = (value, helpers) => {
  const valueArr = value.split('');
  const first = valueArr[0];
  const last = valueArr[valueArr.length - 1];

  if (first === '.' || first === '-' || first === '_') {
    return helpers.message({
      custom: customErrorMessages.usernameCustomValidator['starts.first_case'],
    });
  }
  if (last === '.' || last === '-' || last === '_') {
    return helpers.message({
      custom: customErrorMessages.usernameCustomValidator['ends'],
    });
  }
  if (!isNaN(first)) {
    return helpers.message({
      custom: customErrorMessages.usernameCustomValidator['starts.second_case'],
    });
  }
  return value;
};

export const userValidator: Joi.ObjectSchema<IUser> = Joi.object({
  username: joiPassoword
    .string()
    .required()
    .empty()
    .min(5)
    .max(30)
    .pattern(/^(?!.*?([_.-]).*\1)[\w.-]+$/, { name: 'special' })
    .custom(method, 'custom validation')
    .messages(customErrorMessages.username),
  password: joiPassoword
    .string()
    .required()
    .min(5)
    .max(30)
    .minOfUppercase(1)
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .onlyLatinCharacters()
    .doesNotInclude(['password', 'PASSWORD', 'Password', 'qwerty', 'QWERTY'])
    .messages(customErrorMessages.password),
});
