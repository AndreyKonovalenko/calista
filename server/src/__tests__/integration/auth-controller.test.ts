import request from 'supertest';
import express from 'express';
import expressLoader from '../../loaders/express-loader';
import { dbConnect, dbDisconnect } from './db-handler';
import { generateToken } from '../../services/auth-service';
import { UserModel } from '../../models/UserModel';

const testUser = {
  username: 'Marck.7_cker-berg',
  password: 'M@rck_Zucker-Ber%$111',
};

const app = express();
beforeAll(async () => dbConnect());
beforeAll(async () => await expressLoader(app));
afterAll(async () => dbDisconnect());

describe('Auth Controller', () => {
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

  describe('login', () => {
    it('should login and return user', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send(testUser);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        username: testUser.username,
        isAuth: true,
      });
    });

    it('should not grant access if wrong username', async () => {
      const wrongUser = { ...testUser, username: 'Sam Sulek' };
      const response = await request(app)
        .post('/api/auth/login')
        .send(wrongUser);
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(
        `Unauthorized: User ${wrongUser.username} not found`,
      );
    });

    it('should not grant access if wrong password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ ...testUser, password: '1111' });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(
        'Unauthorized: Password is not correct',
      );
    });
  });

  describe('getUser, generateToken, !there are no usermodal validation in this test cases!', () => {
    it('should return  isAuth:true  and username if cookie presists and jwt and not expired', async () => {
      const user = await UserModel.create({
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
      const user = await UserModel.create({
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
