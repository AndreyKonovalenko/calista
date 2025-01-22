import request from 'supertest';
import app from '../../app';
import { dbConnect, dbDisconnect } from './db-handler';

const testUser = {
  username: 'Mark',
  password: '132'
}

const userCreated = {
  _id: '6790ac474cbb2277a42b517f',
  username: 'Mark',
  password: '$2b$10$Z4QfZeln57bS4RzgG9F/LOJSzMt5KR37qj49cqu6SkhnI/o0z9jti',
  __v: '0', 
}


beforeAll(async () => dbConnect())
afterAll(async () => dbDisconnect())
// afterEach(async () => clearCollections())

describe("Auth Controller", () => {
    it('should be no user inititaly', async () => {
      const response = await request(app).get('/api/auth/users');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([])
    })
    
    it('should create new user', async () => {
      const response = await request(app).post('/api/auth').send(testUser);
      expect(response.status).toBe(201)
      expect(response.text).toBe(`New user ${testUser.username} successfully created`)
    })
    
    it('it should return one user', async () => {
      const response = await request(app).get('/api/auth/users');
      console.log(response.body)
      expect(response.status).toBe(200);
      expect(response.body).toEqual([userCreated])
    })
    
    
    // it('should create a user', async() => {
    //   const response = await request(app).post('/api/atuh').send(testUser);
    //   console.log(response.body)
    //   expect(response.statusCode).toBe(200);
    //   expect(response.body).toEqual(testUser);
    // });

})
