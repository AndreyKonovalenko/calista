import request from 'supertest';
import app from '../../app';

// const testUser = {
//   username: 'Mark',
//   password: '132'
// }

it('should be no user inititaly', async () => {
  const response = await request(app).get('/api/users');
  console.log(response.body)
  expect(response.status).toBe(200);
  expect(response.body).toEqual({})
})

// it('should create a user', async() => {
//   const response = await request(app).post('/api/atuh').send(testUser);
//   console.log(response.body)
//   expect(response.statusCode).toBe(200);
//   expect(response.body).toEqual(testUser);
// });