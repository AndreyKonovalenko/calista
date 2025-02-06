import { validateUser } from '../../models/UserModel';

const user = {
  username: 'Mar',
  password: 'Zuk',
};

describe('Validators', () => {
  it('should validate user schema before new user createion', () => {
    expect(validateUser(user)).toEqual(user);
  });
});
