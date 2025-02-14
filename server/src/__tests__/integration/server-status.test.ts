import request from 'supertest';
import expressLoader from '../../loaders/express-loader';
import express from 'express';

const app = express();

beforeAll(async () => await expressLoader(app));

describe('get /status', () => {
  it('respond with "Hello World', async () => {
    const response = await request(app).get('/status');
    expect(response.status).toBe(200);
  });
});
