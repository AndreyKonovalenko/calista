import express from 'express';
import request from 'supertest';
import expressLoader from '../../loaders/express-loader';
import { clearCollections, dbConnect, dbDisconnect } from './db-handler';
import { Types } from 'mongoose';

import { BoardModel } from '../../models/BoardModel';
import { ListModel } from '../../models/ListModel';
import { CardModel } from '../../models/CardModel';
import {
  CheckListItemModel,
  CheckListModel,
} from '../../models/CheckListModel';
import { generateToken } from '../../services/auth-service';
import { setUpMockDb } from './mock-data-db';
import { UserModel } from '../../models/UserModel';

const app = express();
beforeAll(async () => dbConnect());
beforeAll(async () => expressLoader(app));
afterAll(async () => clearCollections());
afterAll(async () => dbDisconnect());

beforeAll(async () => setUpMockDb());

let testListId: Types.ObjectId;
let token: string;
let testBoardId: Types.ObjectId;

beforeAll(async () => {
  const user = await UserModel.find({});
  token = generateToken(user[0]._id, '20000');
  testBoardId = (await BoardModel.find({}))[0]._id;
  testListId = (await ListModel.find({}))[0]._id;
});

describe('ListsController', () => {
  describe('/:id', () => {
    it('should update list pos', async () => {
      const response = await request(app)
        .put(`/api/lists/${testListId}`)
        .send({ pos: 8192 })
        .set('Cookie', [`jwt=${token}`]);
      const list = await ListModel.findById(testListId);
      expect(list).not.toBeNull();
      if (list) {
        expect(list.pos).toBe(8192);
      }
      expect(response.status).toBe(200);
      expect(response.text).toBe('list successfuly updated');
    });
  });

  describe('/', () => {
    it('should create new list', async () => {
      const data = {
        boardId: testBoardId,
        name: 'IN PROGRESS',
        cards: [],
      };
      const response = await request(app)
        .post('/api/lists/')
        .send(data)
        .set('Cookie', [`jwt=${token}`]);
      console.log(response.body);
      expect(response.status).toBe(200);
    });
  });

  describe('/:id', () => {
    it('should retun popultaed list', async () => {
      const response = await request(app)
        .get(`/api/lists/${testListId}`)
        .set('Cookie', [`jwt=${token}`]);
      const board = await BoardModel.findById(testBoardId);
      expect(board?.lists.length).toBe(2);
      expect(response.status).toBe(200);
    });
  });
  // describe('/:id', () => {
  //   it('should delelet list by it id', async () =>  {
  //     const response = await request(app)
  //   })
  // })
});

describe('BoardsController', () => {
  describe('/', () => {
    it('should return array of boards for current user, in current case there is one board', async () => {
      const response = await request(app)
        .get('/api/boards/')
        .set('Cookie', [`jwt=${token}`]);
      expect(response.status).toBe(200);
      console.log('array of boards', response.body);
      expect(JSON.stringify(response.body)).toEqual(
        JSON.stringify([{ _id: testBoardId, name: 'test board' }]),
      );
    });
  });

  describe('/:id', () => {
    it('should return error if attempt to delete non existing board ', async () => {
      const response = await request(app)
        .delete('/api/boards/7abb47cb365ecc1fdsdf8014')
        .set('Cookie', [`jwt=${token}`]);
      expect(response.status).toBe(400);
    });

    it('should return populated board', async () => {
      const response = await request(app)
        .get(`/api/boards/${testBoardId}`)
        .set('Cookie', [`jwt=${token}`]);
      expect(response.status).toBe(200);
    });

    it('should delete board ', async () => {
      const response = await request(app)
        .delete(`/api/boards/${testBoardId}`)
        .set('Cookie', [`jwt=${token}`]);
      expect((await BoardModel.find({})).length).toBe(0);
      expect((await ListModel.find({})).length).toBe(0);
      expect((await CardModel.find({})).length).toBe(0);
      expect((await CheckListModel.find({})).length).toBe(0);
      expect((await CheckListItemModel.find({})).length).toBe(0);
      expect(response.status).toBe(200);
    });

    describe('/', () => {
      it('should return empty array if there are no boards for current user', async () => {
        const response = await request(app)
          .get('/api/boards/')
          .set('Cookie', [`jwt=${token}`]);
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
      });
    });
  });
});
