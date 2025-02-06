import { validateUser } from '../../models/UserModel';

const user = {
  username: 'Mark_Z@kerbserg',
  password: 'Zuk',
};

describe('Validators', () => {
  it('should thw', () => {
    expect(validateUser(user)).toEqual(user);
  });
  const user1 = { ...user, username: '' };
  it('should thw', () => {
    expect(validateUser(user1)).toEqual(user1);
  });
});
