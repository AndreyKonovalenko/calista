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
    it('should create new card', async () => {
      const data = {
        boardId: testBoardId,
        listId: testListId,
        name: 'Oranges',
        checkLists: [],
        pos: 32768,
      };
      const response = await request(app)
        .post('/api/cards/')
        .send(data)
        .set('Cookie', [`jwt=${token}`]);
      expect(response.status).toBe(200);
      expect((await CardModel.find({})).length).toBe(2);
    });
  });

  describe('/:id', () => {
    it('should update card pos', async () => {
      const response = await request(app)
        .put(`/api/cards/${testCardId}`)
        .send({ pos: 49152 })
        .set('Cookie', [`jwt=${token}`]);
      const card = await CardModel.findById(testCardId);
      expect(card).not.toBeNull();
      if (card) {
        expect(card.pos).toBe(49152);
      }
      expect(response.status).toBe(200);
      expect(response.text).toBe('card successfuly updated');
    });
  });

  describe('/:id', () => {
    it('should delete card by it id', async () => {
      const response = await request(app)
        .delete(`/api/cards/${testCardId}`)
        .set('Cookie', [`jwt=${token}`]);
      expect(response.status).toBe(200);
      expect((await CardModel.find({}))[0].name).toEqual('Oranges');
      expect(await CardModel.findById(testListId)).toBeNull();
      expect(await CheckListModel.findById(testListId)).toBeNull();
      expect(await CheckListItemModel.findById(testListId)).toBeNull();
    });
  });
});
