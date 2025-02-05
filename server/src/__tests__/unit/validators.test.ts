import { validateUser } from '../../models/UserModel';

const user = {
  username: 'Mark Zuker',
  password: 'Zukeradf334',
};

describe('Validators', () => {
  it('should validate user schema before new user createion', () => {
    expect(validateUser(user)).toEqual(user);
  });
});
