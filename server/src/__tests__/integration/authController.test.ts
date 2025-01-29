import request from 'supertest';
import app from '../../app';
import { dbConnect, dbDisconnect } from './db-handler';
import { generateToken } from '../../services/authService';
import { UserModal } from '../../models/UserModel';

const testUser = {
  username: 'Mark',
  password: '132',
};

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());
// afterEach(async () => clearCollections())

describe('Auth Controller', () => {
  // it('should be no user inititaly', async () => {
  //   const response = await request(app).get('/api/auth/users');
  //   expect(response.status).toBe(200);
  //   expect(response.body).toEqual([]);
  // });

  describe('create user', () => {
    it('should create new user', async () => {
      const response = await request(app).post('/api/auth').send(testUser);
      expect(response.status).toBe(201);
      expect(response.text).toBe(
        `New user ${testUser.username} successfully created`,
      );
    });
    it('should not create new user, if the username already exists', async () => {
      const response = await request(app).post('/api/auth').send(testUser);
      expect(response.status).toBe(409);
      expect(response.body.message).toBe(
        `Conflict: username: ${testUser.username} already exists`,
      );
    });
  });

  // describe('get all users', () => {
  //   it('should return array of  users', async () => {
  //     const response = await request(app).get('/api/auth/users');
  //     expect(response.status).toBe(200);
  //     expect(response.body).toEqual(
  //       expect.arrayContaining([
  //         expect.objectContaining({
  //           __v: expect.any(Number),
  //           _id: expect.any(String),
  //           password: expect.any(String),
  //           username: expect.any(String),
  //         }),
  //       ]),
  //     );
  //   });
  // });

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

  describe('getUser', () => {
    it('should return  isAuth:true  and username if cookie presists and jwt and not expired', async () => {
      const user = await UserModal.create({
        username: 'Mark2',
        password: '1111',
      });
      if (user) {
        const token = generateToken(user._id, '20000');
        const response = await request(app)
          .get('/api/auth')
          .set('Cookie', [`jwt=${token}`]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ isAuth: true, username: 'Mark2' });
      }
    });
    it('should return unauthorized if no token, async', async () => {
      const response = await request(app)
        .get('/api/auth')
        .set('Cookie', [`jwt=`]);
      expect(response.status).toBe(401);
    });
    it('should return  Expiration Error', async () => {
      const user = await UserModal.create({
        username: 'Mark3',
        password: '1111',
      });
      if (user) {
        const token = generateToken(user._id, '0');
        const response = await request(app)
          .get('/api/auth')
          .set('Cookie', [`jwt=${token}`]);
        expect(response.status).toBe(401);
      }
    });
  });
});
