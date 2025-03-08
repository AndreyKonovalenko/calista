import express from 'express';
import request from 'supertest';
import expressLoader from '../../loaders/express-loader';
import { clearCollections, dbConnect, dbDisconnect } from './db-handler';
import { Types } from 'mongoose';

import { BoardModel } from '../../models/BoardModel';
import { ListModel } from '../../models/ListModel';
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
let testCardId: Types.ObjectId;

beforeAll(async () => {
  const user = await UserModel.find({});
  token = generateToken(user[0]._id, '20000');
  testBoardId = (await BoardModel.find({}))[0]._id;
  testListId = (await ListModel.find({}))[0]._id;
  testCardId = (await CardModel.find({}))[0]._id;
});

describe('CardsController', () => {
  describe('/:id', () => {
    it('should return popultaed card', async () => {
      const response = await request(app)
        .get(`/api/cards/${testCardId}`)
        .set('Cookie', [`jwt=${token}`]);
      const list = await ListModel.findById(testListId);
      expect(list?.cards.length).toBe(1);
      expect(response.status).toBe(200);
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
      expect(response.status).toBe(200);
      expect((await ListModel.find({})).length).toBe(2);
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
      expect(response.text).toBe('list successfuly updated');
    });
  });

  describe('/:id', () => {
    it('should delete list by it id', async () => {
      const response = await request(app)
        .delete(`/api/boards/${testListId}`)
        .set('Cookie', [`jwt=${token}`]);
      expect(response.status).toBe(200);
      expect((await ListModel.find({}))[0].name).toEqual('TO DO');
      expect(await CardModel.findById(testListId)).toBeNull();
      expect(await CheckListModel.findById(testListId)).toBeNull();
      expect(await CheckListItemModel.findById(testListId)).toBeNull();
    });
  });
});
