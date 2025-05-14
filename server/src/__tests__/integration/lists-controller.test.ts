import express from 'express';
import request from 'supertest';
import expressLoader from '../../loaders/express-loader';
import { clearCollections, dbConnect, dbDisconnect } from './db-handler';
import { Types } from 'mongoose';

import { BoardModel } from '../../models/BoardModel';
import { IList, ListModel } from '../../models/ListModel';
import { generateToken } from '../../services/auth-service';
import { setUpMockDb } from './mock-data-db';
import { UserModel } from '../../models/UserModel';
import { CardModel } from '../../models/CardModel';
import {
  CheckListItemModel,
  CheckListModel,
} from '../../models/CheckListModel';

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
    it('should return popultaed list', async () => {
      const response = await request(app)
        .get(`/api/lists/${testListId}`)
        .set('Cookie', [`jwt=${token}`]);
      console.log(response.body);
      const board = await BoardModel.findById(testBoardId);
      console.log(board);
      expect(response.body.name).toBe('DONE');
      expect(board?.lists.length).toBe(3);
      expect(response.status).toBe(200);
    });
  });

  describe('/', () => {
    it('should create new list', async () => {
      type TTestList = Omit<IList, 'createrId' | 'cards'>;
      const data: TTestList = {
        boardId: testBoardId,
        name: 'IN PROGRESS2',
        pos: 94208,
      };
      const response = await request(app)
        .post('/api/lists/')
        .send(data)
        .set('Cookie', [`jwt=${token}`]);
      expect(response.status).toBe(200);
      const board = await BoardModel.findById(testBoardId);
      expect(board?.lists.length).toBe(4);
      expect((await ListModel.find({})).length).toBe(4);
    });
  });

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
      expect(response.text).toBe('list successfully updated');
    });
  });

  describe('/:id', () => {
    it('should delete list by id', async () => {
      expect((await BoardModel.findById(testBoardId))?.lists.length).toBe(4);
      const response = await request(app)
        .delete(`/api/lists/${testListId}`)
        .set('Cookie', [`jwt=${token}`]);
      expect(response.status).toBe(200);
      expect((await BoardModel.findById(testBoardId))?.lists.length).toBe(3);
      expect((await ListModel.find({}))[0].name).toEqual('IN PROGRESS');
      expect(await ListModel.findById(testListId)).toBeNull();
      expect(await CardModel.findOne({ listId: testListId })).toBeNull();
      expect(await CheckListModel.findOne({ listId: testListId })).toBeNull();
      expect(
        await CheckListItemModel.findOne({ listId: testListId }),
      ).toBeNull();
    });
  });
});
