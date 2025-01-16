import app from '../server';
import request from 'supertest'

describe("GET /", () => {
  it('respond with "Hello World', async ()=> {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello World");
  })
})