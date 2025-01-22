import request from 'supertest';
import app from '../../app';
import { dbConnect, dbDisconnect } from './db-handler';
// import { generateToken } from '../../services/authService';

const testUser = {
  username: 'Mark',
  password: '132',
};

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());
// afterEach(async () => clearCollections())

describe('Auth Controller', () => {
  it('should be no user inititaly', async () => {
    const response = await request(app).get('/api/auth/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  describe('create user', () => {
    it('should create new user', async () => {
      const response = await request(app).post('/api/auth').send(testUser);
      expect(response.status).toBe(201);
      expect(response.text).toBe(
        `New user ${testUser.username} successfully created`,
      );
    });
  });

  describe('get all users', () => {
    it('should return array of  users', async () => {
      const response = await request(app).get('/api/auth/users');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            __v: expect.any(Number),
            _id: expect.any(String),
            password: expect.any(String),
            username: expect.any(String),
          }),
        ]),
      );
    });
  });

  describe('login', () => {
    it('should login and return user', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send(testUser);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ username: 'Mark', isAuth: true });
    });

    const wrongUsernam = { ...testUser, username: 'Sam Sulek' };
    it('should not grant access if wrong password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send(wrongUsernam);
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(
        `Unauthorized: User ${wrongUsernam.username} not found.`,
      );
    });

    const wrongPassword = { ...testUser, password: '1111' };
    it('should not grant access if wrong password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send(wrongPassword);
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(
        'Unauthorized: Password is not correct.',
      );
    });
  });
});

// it('should create a user', async() => {
//   const response = await request(app).post('/api/atuh').send(testUser);
//   console.log(response.body)
//   expect(response.statusCode).toBe(200);
//   expect(response.body).toEqual(testUser);
// });
