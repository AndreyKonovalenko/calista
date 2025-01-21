import request from 'supertest';
import app from '../../app';
import { dbConnect, dbDisconnect, clearCollections } from './db-handler';

const testUser = {
  username: 'Mark',
  password: '132'
}

beforeAll(async () => dbConnect())
afterAll(async () => dbDisconnect())
afterEach(async () => clearCollections())


it('should be no user inititaly', async () => {
  const response = await request(app).get('/api/users');
  expect(response.status).toBe(200);
  expect(response.body).toEqual({})
})

it('should create new user', async () => {
  const response = await request(app).post('/api/auth').send(testUser);
  console.log(response.body)
  expect(response.status).toBe(200)
}, 1000)

// it('should create a user', async() => {
//   const response = await request(app).post('/api/atuh').send(testUser);
//   console.log(response.body)
//   expect(response.statusCode).toBe(200);
//   expect(response.body).toEqual(testUser);
// });