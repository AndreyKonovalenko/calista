import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';

const joiPassoword = Joi.extend(joiPasswordExtendCore);

 export  const userValidator = Joi.object({
    username: joiPassoword
      .string()
      .min(5)
      .pattern(/^(?!\d|.*?([_.-]).*\1)[\w.-]+$/, { name: 'special' })
      .max(30)
      .required()
      .messages({
        'any.required': '{#label} is required',
        'username.min': '{#label} should be at least {#min} characters long.',
        'string.pattern.name':
          '{#label} should contain only one of "-", "." and "_" special characters',
        'username.empty': '{#label} cannot be empty',
        'username.max': '{#label} should not exceed {#max} character',
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
