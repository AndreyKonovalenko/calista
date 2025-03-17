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

describe('NOT FOUND', () => {
  it('should return not found Error if url is wrong', async () => {
    const response = await request(app).get('/boards/api/bords/');
    expect(response.body.message).toBe('path /boards/api/bords/ not found');
    expect(response.status).toBe(404);
  });
});
