const username = {
  'any.required': 'username is required',
  'string.empty': 'username cannot be empty',
  'string.min': 'username should be at least 5 characters long',
  'string.max': 'username should not exceed 30 character',
  'string.pattern.name':
    'username should contain only one of "-", "." and "_" special characters',
};

const usernameCustomValidator = {
  'starts.first_case': 'username should not starts with "-", "_", "."',
  'starts.second_case': 'username should not starts with number',
  ends: 'username should not ends with "-", "_", "."',
};

const password = {
  'any.required': 'password is required',
  'string.empty': 'password cannot be empty',
  'string.min': 'password should be at least 5 characters long',
  'string.max': 'password should not exceed 30 character',
  'password.minOfUppercase':
    'password should contain at least 1 uppercase character',
  'password.minOfSpecialCharacters':
    'password should contain at least 1 special character',
  'password.minOfLowercase':
    'password should contain at least 1 lowercase character',
  'password.minOfNumeric':
    'password should contain at least 1 numeric character',
  'password.noWhiteSpaces': 'password should not contain white spaces',
  'password.onlyLatinCharacters':
    'password should contain only latin characters',
};

export default {
  username,
  usernameCustomValidator,
  password,
};
