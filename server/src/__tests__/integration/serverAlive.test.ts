import request from 'supertest';
import expressLoader from '../../loaders/expressLoader';
import express from 'express';

const app = express();

beforeAll(async () => await expressLoader(app));

describe('GET /', () => {
  it('respond with "Hello World', async () => {
    const response = await request(app).get('/api/status');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World');
  });
});
