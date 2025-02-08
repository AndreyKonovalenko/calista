import Joi, { CustomValidator } from 'joi';
import { joiPasswordExtendCore } from 'joi-password';

const joiPassoword = Joi.extend(joiPasswordExtendCore);

const method: CustomValidator = (value, helpers) => {
  const valueArr = value.split('');
  const first = valueArr[0];
  const last = valueArr[valueArr.length - 1];

  if (first === '.' || first === '-' || first === '_') {
    return helpers.message({
      custom: '{#label} should not starts with "-", "_", "."',
    });
  }
  if (last === '.' || last === '-' || last === '_') {
    return helpers.message({
      custom: '{#lablel} should not ends with "-", "_", "."',
    });
  }
  if (!isNaN(first)) {
    return helpers.message({
      custom: '{#label} should not starts with number',
    });
  }
  return value;
};

export const userValidator = Joi.object({
  username: joiPassoword
    .string()
    .required()
    .empty()
    .min(5)
    .max(30)
    .pattern(/^(?!.*?([_.-]).*\1)[\w.-]+$/, { name: 'special' })
    .custom(method, 'custom validation')
    .messages({
      'any.required': '{#label} is required',
      'string.empty': '{#label} cannot be empty',
      'username.min': '{#label} should be at least {#min} characters long.',
      'username.max': '{#label} should not exceed {#max} character',
      'string.pattern.name':
        '{#label} should contain only one of "-", "." and "_" special characters',
    }),
  password: joiPassoword
    .string()
    .required()
    .min(5)
    .minOfSpecialCharacters(1)
    .minOfLowercase(5)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .onlyLatinCharacters()
    .doesNotInclude(['password', 'PASSWORD', 'Password', 'qwerty', 'QWERTY'])
    .messages({
      'any.required': '{#label} is required',
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
