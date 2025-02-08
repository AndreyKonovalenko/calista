import { userValidator } from '../../middleware/validators/user-validator';
const user = {
  username: 'M@rk_Zuckerberg',
  password: 'Zuc',
};
const user1 = { ...user, username: '' };
const user2 = { username: 'AMarkZuker', password: 'Znamekaadf1435_4' };
const user3 = { username: '4MarkZuker', password: 'Znamekaadf1435_4' };
const user4 = { password: 'Znamekaadf1435_4' };

describe('userValidator', () => {
  it('should thorw validation error if username contains forbidden special character', () => {
    expect(userValidator.validate(user).error?.details[0].message).toEqual(
      '"username" should contain only one of "-", "." and "_" special characters',
    );
  });

  it('should thorw validation error if username contains empty sting', () => {
    expect(userValidator.validate(user1).error?.details[0].message).toEqual(
      '"username" cannot be empty',
    );
  });

  it('should thw', () => {
    expect(userValidator.validate(user2)).toEqual({ value: user2 });
  });

  it('should thw', () => {
    expect(userValidator.validate(user3)).toEqual({ value: user3 });
  });

  it('should thw', () => {
    expect(userValidator.validate(user4)).toEqual({ value: user4 });
  });
});
