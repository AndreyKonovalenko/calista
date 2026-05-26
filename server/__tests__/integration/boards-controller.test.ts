import express from 'express';
import request from 'supertest';
import expressLoader from './../../src/loaders/express-loader';
import { clearCollections, dbConnect, dbDisconnect } from './db-handler';
import { Types } from 'mongoose';

import { BoardModel, IBoard } from './../../src/models/BoardModel';
import { ListModel } from './../../src/models/ListModel';
import { CardModel } from './../../src/models/CardModel';
import { ChecklistModel } from './../../src/models/ChecklistModel';
import { ChecklistItemModel } from '../../src/models/ChecklistItemMedel';
import { generateToken } from './../../src/services/auth-service';
import { setUpMockDb } from './mock-data-db';
import { UserModel } from './../../src/models/UserModel';
import customErrorMessages from './../../src/middleware/validators/custom-error-messages';

const app = express();
beforeAll(async () => dbConnect());
beforeAll(async () => expressLoader(app));
afterAll(async () => clearCollections());
afterAll(async () => dbDisconnect());

beforeAll(async () => setUpMockDb());

let token: string;
let testBoardId: Types.ObjectId;

beforeAll(async () => {
  const user = await UserModel.find({});
  token = generateToken(user[0]._id, '20000');
  testBoardId = (await BoardModel.find({}))[0]._id;
});

describe('BoardsController', () => {
  describe('/', () => {
    it('should return array of boards for current user, in current case there is one board', async () => {
      const response = await request(app)
        .get('/api/boards/')
        .set('Cookie', [`jwt=${token}`]);
      expect(response.status).toBe(200);
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

    it('should run renumbering of lists postion', async () => {
      const response = await request(app)
        .put(`/api/boards/${testBoardId}`)
        .set('Cookie', [`jwt=${token}`])
        .send({ action: 'renumbering' });
      expect(response.status).toBe(200);
      expect(response.text).toBe('board successfully updated');

      const board = await request(app)
        .get(`/api/boards/${testBoardId}`)
        .set('Cookie', [`jwt=${token}`]);
      expect(board.status).toBe(200);
      console.log(board.body);
      for (const element of board.body.lists) {
        if (element.name === 'TO DO') {
          expect(element.pos).toEqual(16384);
        }
        if (element.name === 'IN PROGRESS') {
          expect(element.pos).toEqual(49080);
        }
        if (element.name === 'DONE') {
          expect(element.pos).toEqual(32732);
        }
      }
    });

    it('should update board name', async () => {
      const response = await request(app)
        .put(`/api/boards/${testBoardId}`)
        .set('Cookie', [`jwt=${token}`])
        .send({ name: 'new board name' });
      expect(response.status).toBe(200);
      expect(response.text).toBe('board successfully updated');
      expect((await BoardModel.findById(testBoardId))?.name).toBe(
        'new board name',
      );
    });

    it('should not update board name and should return validation error', async () => {
      const response = await request(app)
        .put(`/api/boards/${testBoardId}`)
        .set('Cookie', [`jwt=${token}`])
        .send({
          name: 'new board name  new board name  new board name  new board name ',
        });
      expect(response.status).toBe(422);
      expect(response.body.message).toEqual(
        customErrorMessages.boardName['string.max'],
      );
    });

    it('should delete board ', async () => {
      const response = await request(app)
        .delete(`/api/boards/${testBoardId}`)
        .set('Cookie', [`jwt=${token}`]);
      expect((await BoardModel.find({})).length).toBe(0);
      expect((await ListModel.find({})).length).toBe(0);
      expect((await CardModel.find({})).length).toBe(0);
      expect((await ChecklistModel.find({})).length).toBe(0);
      expect((await ChecklistItemModel.find({})).length).toBe(0);
      expect(response.status).toBe(200);
    });
  });

  describe('/', () => {
    it('should return empty array if there are no boards for current user', async () => {
      const response = await request(app)
        .get('/api/boards/')
        .set('Cookie', [`jwt=${token}`]);
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should create new board', async () => {
      type TTestBoard = Omit<IBoard, 'createrId' | 'lists'>;
      const data: TTestBoard = {
        name: 'Test Board 2',
      };
      const response = await request(app)
        .post('/api/boards/')
        .set('Cookie', [`jwt=${token}`])
        .send(data);
      expect(response.status).toBe(200);
      expect(await BoardModel.findOne({ name: 'Test Board 2' })).not.toBeNull();
    });
  });
});
