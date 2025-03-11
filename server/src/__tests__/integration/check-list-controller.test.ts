import express from 'express';
import request from 'supertest';
import expressLoader from '../../loaders/express-loader';
import { clearCollections, dbConnect, dbDisconnect } from './db-handler';
import { Types } from 'mongoose';
import { ListModel } from '../../models/ListModel';
import { generateToken } from '../../services/auth-service';
import { setUpMockDb } from './mock-data-db';
import { UserModel } from '../../models/UserModel';
import { CardModel } from '../../models/CardModel';
import {
  CheckListItemModel,
  CheckListModel,
  ICheckList,
  ICheckListItem,
} from '../../models/CheckListModel';
import { BoardModel } from '../../models/BoardModel';

const app = express();
beforeAll(async () => dbConnect());
beforeAll(async () => expressLoader(app));
afterAll(async () => clearCollections());
afterAll(async () => dbDisconnect());
beforeAll(async () => setUpMockDb());

let testListId: Types.ObjectId;
let testBoardId: Types.ObjectId;
let token: string;
let testCardId: Types.ObjectId;
let testCheckListId: Types.ObjectId;
let testCheckListItemId: Types.ObjectId;

beforeAll(async () => {
  const user = await UserModel.find({});
  token = generateToken(user[0]._id, '20000');
  testBoardId = (await BoardModel.find({}))[0]._id;
  testListId = (await ListModel.find({}))[0]._id;
  testCardId = (await CardModel.find({}))[0]._id;
  testCheckListId = (await CheckListModel.find({}))[0]._id;
  testCheckListItemId = (await CheckListItemModel.find({}))[0]._id;
});

describe('CheckListsController', () => {
  describe('/:id', () => {
    it('should return popultaed checklist', async () => {
      const response = await request(app)
        .get(`/api/checklists/${testCheckListId}`)
        .set('Cookie', [`jwt=${token}`]);
      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Fruits');
    });
  });

  describe('/', () => {
    it('should create new checklist', async () => {
      type TTestCheckList = Omit<ICheckList, 'createrId' | 'checkItems'>;
      const data: TTestCheckList = {
        boardId: testBoardId,
        listId: testListId,
        cardId: testCardId,
        name: 'Vegetabels',
      };
      const response = await request(app)
        .post('/api/checklists/')
        .send(data)
        .set('Cookie', [`jwt=${token}`]);
      expect(response.status).toBe(200);
      const card = await CardModel.findById(testCardId);
      expect(card?.checkLists.length).toBe(2);
      expect((await CheckListModel.find({})).length).toBe(2);
    });
  });

  describe('/:id', () => {
    it('should update checkList name', async () => {
      const response = await request(app)
        .put(`/api/checklists/${testCheckListId}`)
        .send({ name: 'Berries' })
        .set('Cookie', [`jwt=${token}`]);
      const checkList = await CheckListModel.findById(testCheckListId);
      expect(checkList).not.toBeNull();
      if (checkList) {
        expect(checkList.name).toBe('Berries');
      }
      expect(response.status).toBe(200);
      expect(response.text).toBe('CheckList successfully updated');
    });
  });

  describe('/:id', () => {
    it('should delete checklist by id', async () => {
      const checkList = await CheckListModel.findOne({ name: 'Vegetabels' });
      const response = await request(app)
        .delete(`/api/checklists/${checkList?._id}`)
        .set('Cookie', [`jwt=${token}`]);
      expect(response.status).toBe(200);
      expect(await CheckListModel.findById(checkList?._id)).toBeNull();
      expect(
        await CheckListItemModel.findOne({ checkListId: checkList?._id }),
      ).toBeNull();
      expect(await CheckListModel.findById(testCheckListId)).not.toBeNull();
      expect(
        (await CardModel.findById(testCardId))?.checkLists[0].equals(
          testCheckListId,
        ),
      ).toBe(true);
    });
  });

  describe('/:id/items/:itemId', () => {
    it('should return checklist item', async () => {
      const response = await request(app)
        .get(`/api/checklists/${testCheckListId}/items/${testCheckListItemId}`)
        .set('Cookie', [`jwt=${token}`]);
      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Apple');
    });
  });

  describe('/:id/items/', () => {
    it('should create new checklist item', async () => {
      type TTestCheckListItem = Omit<ICheckListItem, 'createrId' | 'state'>;
      const data: TTestCheckListItem = {
        checkListId: testCheckListId,
        boardId: testBoardId,
        listId: testListId,
        cardId: testCardId,
        name: 'Cherry',
        pos: 32768,
      };
      const response = await request(app)
        .post(`/api/checklists/${testCheckListId}/items/`)
        .send(data)
        .set('Cookie', [`jwt=${token}`]);
      expect(response.status).toBe(200);
      expect(
        await CheckListItemModel.findOne({ name: 'Cherry' }),
      ).not.toBeNull();
      expect((await CheckListItemModel.find({})).length).toBe(2);
      expect(response.text).toBe(`item ${data.name} succesfuly created`);
    });
  });

  describe('/:id/items/:itemId', () => {
    it('should update checklist item', async () => {
      const response = await request(app)
        .put(`/api/checklists/${testCheckListId}/items/${testCheckListItemId}`)
        .send({ name: 'Watermelon', pos: 49152 })
        .set('Cookie', [`jwt=${token}`]);
      const checkListItem =
        await CheckListItemModel.findById(testCheckListItemId);
      expect(checkListItem).not.toBeNull();
      if (checkListItem) {
        expect(checkListItem.name).toBe('Watermelon');
        expect(checkListItem.pos).toBe(49152);
      }
      expect(response.status).toBe(200);
      expect(response.text).toBe('CheckListItem successfully updated');
    });
  });

  describe('/:id/items/:itemId', () => {
    it('should delete checklist item', async () => {
      const checkListItem = await CheckListItemModel.findOne({
        name: 'Cherry',
      });
      const response = await request(app)
        .delete(
          `/api/checklists/${testCheckListId}/items/${checkListItem?._id}`,
        )
        .set('Cookie', [`jwt=${token}`]);
      expect(response.status).toBe(200);
      expect(await CheckListItemModel.findById(checkListItem?._id)).toBeNull();
      expect(
        (await CheckListItemModel.findById(testCheckListItemId))?.name,
      ).toBe('Watermelon');
      expect(
        (await CheckListModel.findById(testCheckListId))?.checkItems.length,
      ).toBe(1);
    });
  });
});
