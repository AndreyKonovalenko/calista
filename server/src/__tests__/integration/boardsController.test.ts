import express from 'express';
import request from 'supertest';
import expressLoader from '../../loaders/expressLoader';
import { dbConnect, dbDisconnect } from './db-handler';
import { UserModal } from '../../models/UserModel';
import { generateToken } from '../../services/authService';

const testUser = {
  username: 'Marck.7_cker-berg',
  password: 'M@rck_Zucker-Ber%$111',
};

const app = express();
beforeAll(async () => dbConnect());
beforeAll(async () => await expressLoader(app));
afterAll(async () => dbDisconnect());

// create test user and get token for passing protected route
let token = '';
beforeAll(async () => {
  const user = await UserModal.create(testUser);
  if (user) {
    token = generateToken(user._id, '20000');
  }
});

describe('BoardController', () => {
  it('should return empty array if there are no boards for current user', async () => {
    const response = await request(app)
      .get('/api/boards/')
      .set('Cookie', [`jwt=${token}`]);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
