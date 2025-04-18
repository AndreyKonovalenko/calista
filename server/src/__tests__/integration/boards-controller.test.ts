import express from 'express';
import request from 'supertest';
import expressLoader from '../../loaders/express-loader';
import { clearCollections, dbConnect, dbDisconnect } from './db-handler';
import { Types } from 'mongoose';

import { BoardModel, IBoard } from '../../models/BoardModel';
import { ListModel } from '../../models/ListModel';
import { CardModel } from '../../models/CardModel';
import {
  CheckListItemModel,
  CheckListModel,
} from '../../models/CheckListModel';
import { generateToken } from '../../services/auth-service';
import { setUpMockDb } from './mock-data-db';
import { UserModel } from '../../models/UserModel';
import customErrorMessages from '../../middleware/validators/custom-error-messages';

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
      expect((await CheckListModel.find({})).length).toBe(0);
      expect((await CheckListItemModel.find({})).length).toBe(0);
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
