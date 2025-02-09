import { userValidator } from '../../middleware/validators/user-validator';
import customErrorMessages from '../../middleware/validators/custom-error-messages';

const user = {
  username: 'Marck.7_cker-berg',
  password: 'M@rck_Zucker-Ber%$111',
};
const user1 = {
  username: 'M@rk_Zuckerberg',
  password: 'Zuc',
};
const user2 = { username: '', password: 'Znamekaadf1435_4' };
const user3 = { username: '-MarkZuker', password: 'Znamekaadf1435_4' };
const user4 = { username: '4MarkZuker', password: 'Znamekaadf1435_4' };
const user5 = { username: 'Marck_', password: 'Znamekaadf1435_4' };
const user6 = { username: 'Marc', password: 'Znamekaadf1435_4' };
const user7 = {
  username: 'Marc5dsslkaadfadsfadsfadsfadafa',
  password: 'Znamekaadf1435_4',
};
const user8 = {
  username: 'Mark_ Zuckerberg',
  password: 'Zuc',
};

describe('userValidator', () => {
  it('should throw validation error if username contains forbidden special character', () => {
    expect(userValidator.validate(user1).error?.details[0].message).toEqual(
      customErrorMessages.username['string.pattern.name'],
    );
  });

  it('should throw validation error if username contains empty string', () => {
    expect(userValidator.validate(user2).error?.details[0].message).toEqual(
      customErrorMessages.username['string.empty'],
    );
  });

  it('should throw validtation error if username starts with number', () => {
    expect(userValidator.validate(user3).error?.details[0].message).toEqual(
      customErrorMessages.usernameCustomValidator['starts.first_case'],
    );
  });

  it('should throw validtation error if username starts with forbidden special character', () => {
    expect(userValidator.validate(user4).error?.details[0].message).toEqual(
      customErrorMessages.usernameCustomValidator['starts.second_case'],
    );
  });

  it('should thowr validtation error if username ends with forbidden special character', () => {
    expect(userValidator.validate(user5).error?.details[0].message).toEqual(
      customErrorMessages.usernameCustomValidator['ends'],
    );
  });

  it('should throw validation error if username less than 5 character', () => {
    expect(userValidator.validate(user6).error?.details[0].message).toEqual(
      customErrorMessages.username['string.min'],
    );
  });

  it('should throw validation error if username more than 30 character', () => {
    expect(userValidator.validate(user7).error?.details[0].message).toEqual(
      customErrorMessages.username['string.max'],
    );
  });

  it('should throw validation error if username contains (white space)  forbidden special character', () => {
    console.log(userValidator.validate(user8));
    expect(userValidator.validate(user8).error?.details[0].message).toEqual(
      customErrorMessages.username['string.pattern.name'],
    );
  });

  it('should not throw validation error', () => {
    expect(userValidator.validate(user).value).toEqual(user);
    expect(userValidator.validate(user).error).toEqual(undefined);
  });
});
