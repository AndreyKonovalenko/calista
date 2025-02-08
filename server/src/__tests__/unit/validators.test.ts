import { userValidator } from '../../middleware/validators/user-validator';
const user = {
  username: 'Mark_Z@kerbserg',
  password: 'Zuk',
};

describe('user Validator', () => {
  it('should thw', () => {
    expect(userValidator.validate(user)).toEqual(user);
  });
  const user1 = { ...user, username: '' };
  it('should thw', () => {
    expect(userValidator.validate(user1)).toEqual(user1);
  });

  const user2 = { username: 'AMarkZuker', password: 'Znamekaadf1435_4' };
  it('should thw', () => {
    expect(userValidator.validate(user2)).toEqual({ value: user2 });
  });
});
