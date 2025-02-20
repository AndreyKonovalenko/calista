import express from 'express';
import request from 'supertest';
import expressLoader from '../../loaders/express-loader';
import { dbConnect, dbDisconnect } from './db-handler';
import { UserModel } from '../../models/UserModel';
import { generateToken } from '../../services/auth-service';
import { Types } from 'mongoose';

import { BoardModel } from '../../models/BoardModel';
import { ListModel } from '../../models/ListModel';
import { CardModel } from '../../models/CardModel';
import {
  CheckListItemModel,
  CheckListModel,
} from '../../models/CheckListModel';

const testUser = {
  username: 'Marck.7_cker-berg',
  password: 'M@rck_Zucker-Ber%$111',
};

const app = express();
beforeAll(async () => dbConnect());
beforeAll(async () => await expressLoader(app));
afterAll(async () => dbDisconnect());

// create test user and get token for passing protected route
let token: string;
let createrId: Types.ObjectId;
let testBoardId: Types.ObjectId;

beforeAll(async () => {
  // create test user
  const user = await UserModel.create(testUser);
  if (user) {
    createrId = user._id;
    token = generateToken(user._id, '20000');
  }
  // create test board
  const board = await BoardModel.create({
    title: 'test board',
    createrId: createrId,
    lists: [],
  });
  const list = await ListModel.create({
    createrId: createrId,
    boardId: board._id,
    name: 'TO DO',
    cards: [],
    pos: 16384,
  });
  board.lists.push(list._id);
  testBoardId = board._id;
  await board.save();
  const card = await CardModel.create({
    createrId: createrId,
    boardId: board._id,
    listId: list._id,
    name: 'Shoping lists',
    description: 'my favorite food',
    pos: 16384,
  });
  list.cards.push(card._id);
  await list.save();
  const checkList = await CheckListModel.create({
    createrId: createrId,
    boardId: board._id,
    cardId: card._id,
    checkItems: [],
    name: 'Fruits',
  });
  card.checkList = checkList._id;
  await card.save();
  const item = await CheckListItemModel.create({
    createrId: createrId,
    checkListId: checkList._id,
    boardId: board._id,
    name: 'Apple',
    state: 'incomplite',
    pos: 16384,
  });
  checkList.checkItems.push(item._id);
  await checkList.save();
});

describe('BoardController', () => {
  describe('/', () => {
    it('should return array of boards for current user, in current case there is one board', async () => {
      const response = await request(app)
        .get('/api/boards/')
        .set('Cookie', [`jwt=${token}`]);
      expect(response.status).toBe(200);
      expect(response.body.length).toEqual(1);
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
      console.log(response.body.lists[0].cards);
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
