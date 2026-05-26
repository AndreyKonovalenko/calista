import { userValidator } from '../../middleware/validators/user-validator';
import customErrorMessages from '../../middleware/validators/custom-error-messages';

const user = {
  username: 'Marck.7_cker-berg',
  password: 'M@rck_Zucker-Ber%$111',
};

describe('userValidator', () => {
  describe('username', () => {
    it('should throw validation error if username contains forbidden special character', () => {
      expect(
        userValidator.validate({ ...user, username: 'M@rk_Zuckerberg' }).error
          ?.details[0].message,
      ).toEqual(customErrorMessages.username['string.pattern.name']);
    });

    it('should throw validation error if username contains empty string', () => {
      expect(
        userValidator.validate({ ...user, username: '' }).error?.details[0]
          .message,
      ).toEqual(customErrorMessages.username['string.empty']);
    });

    it('should throw validtation error if username starts with number', () => {
      expect(
        userValidator.validate({ ...user, username: '4MarkZuker' }).error
          ?.details[0].message,
      ).toEqual(
        customErrorMessages.usernameCustomValidator['starts.second_case'],
      );
    });

    it('should throw validtation error if username starts with forbidden special character', () => {
      console.log(user);
      expect(
        userValidator.validate({ ...user, username: '-MarkZuker' }).error
          ?.details[0].message,
      ).toEqual(
        customErrorMessages.usernameCustomValidator['starts.first_case'],
      );
    });

    it('should thowr validtation error if username ends with forbidden special character', () => {
      expect(
        userValidator.validate({ ...user, username: 'MarkZuker_' }).error
          ?.details[0].message,
      ).toEqual(customErrorMessages.usernameCustomValidator['ends']);
    });

    it('should throw validation error if username less than 5 character', () => {
      expect(
        userValidator.validate({ ...user, username: 'Mark' }).error?.details[0]
          .message,
      ).toEqual(customErrorMessages.username['string.min']);
    });

    it('should throw validation error if username more than 30 character', () => {
      expect(
        userValidator.validate({
          ...user,
          username: 'Marc5dsslkaadfadsfadsfadsfadafa',
        }).error?.details[0].message,
      ).toEqual(customErrorMessages.username['string.max']);
    });

    it('should throw validation error if username contains (white space) forbidden special character', () => {
      expect(
        userValidator.validate({ ...user, username: 'Mark Zuckerberg' }).error
          ?.details[0].message,
      ).toEqual(customErrorMessages.username['string.pattern.name']);
    });
  });

  describe('password', () => {
    it('should throw validation error if password not provided', () => {
      expect(
        userValidator.validate({ username: user.username }).error?.details[0]
          .message,
      ).toEqual(customErrorMessages.password['any.required']);
    });

    it('should throw validation error if password empty stirng', () => {
      expect(
        userValidator.validate({ ...user, password: '' }).error?.details[0]
          .message,
      ).toEqual(customErrorMessages.password['string.empty']);
    });

    it('should throw validation error if password less than 5 characters', () => {
      expect(
        userValidator.validate({ ...user, password: '2kRK' }).error?.details[0]
          .message,
      ).toEqual(customErrorMessages.password['string.min']);
    });

    it('should throw validation error if password more than 30 characters', () => {
      expect(
        userValidator.validate({
          ...user,
          password: '1345678FDScsdfasdfa90100013245(',
        }).error?.details[0].message,
      ).toEqual(customErrorMessages.password['string.max']);
    });
    it('should throw validation error if password does not contain one or more uppercase char', () => {
      expect(
        userValidator.validate({
          ...user,
          password: 'm@rck_zucker-ber%$111(',
        }).error?.details[0].message,
      ).toEqual(customErrorMessages.password['password.minOfUppercase']);
    });

    it('should throw validation error if password does not contain one or more lowercase char', () => {
      expect(
        userValidator.validate({
          ...user,
          password: 'M@RCK_ZUCKER-BER%$111(',
        }).error?.details[0].message,
      ).toEqual(customErrorMessages.password['password.minOfLowercase']);
    });

    it('should throw validation error if password does not contain one or more numeric', () => {
      expect(
        userValidator.validate({
          ...user,
          password: 'M@rck_Zucker-Ber%$',
        }).error?.details[0].message,
      ).toEqual(customErrorMessages.password['password.minOfNumeric']);
    });

    it('should throw validation error if password contains white space', () => {
      expect(
        userValidator.validate({
          ...user,
          password: 'M@rck_Zucker-Ber%$ 111',
        }).error?.details[0].message,
      ).toEqual(customErrorMessages.password['password.noWhiteSpaces']);
    });

    it('should throw validation error if password contains white space', () => {
      expect(
        userValidator.validate({
          ...user,
          password: 'M@rck_Zucker-Ber%$ 111',
        }).error?.details[0].message,
      ).toEqual(customErrorMessages.password['password.noWhiteSpaces']);
    });

    it('should throw validation error if password contains white space', () => {
      expect(
        userValidator.validate({
          ...user,
          password: 'M@rck_Zucker-Ber%$вы111',
        }).error?.details[0].message,
      ).toEqual(customErrorMessages.password['password.onlyLatinCharacters']);
    });
  });

  describe('correct user, no validation error', () => {
    it('should not throw validation error', () => {
      expect(userValidator.validate(user).value).toEqual(user);
      expect(userValidator.validate(user).error).toEqual(undefined);
    });
  });
});
