import express from 'express';
import request from 'supertest';
import expressLoader from '../../loaders/express-loader';
import { dbConnect, dbDisconnect } from './db-handler';
import { UserModal } from '../../models/UserModel';
import { generateToken } from '../../services/auth-service';
import { Types } from 'mongoose';

import { BoardModel } from '../../models/BoardModel';
import { ListModal } from '../../models/ListModel';
import { CardModal } from '../../models/CardModel';
import { CheckListItemModal, CheckListModal } from '../../models/CheckListModel';

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

beforeAll(async () => {
  const user = await UserModal.create(testUser);
  if (user) {
    createrId = user._id;
    token = generateToken(user._id, '20000');
  }
});

describe('BoardController', () => {
  describe('/', () => {
    it('should return empty array if there are no boards for current user', async () => {
      const response = await request(app)
        .get('/api/boards/')
        .set('Cookie', [`jwt=${token}`]);
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });
  describe('/:id', () => {
    it('should return error if attempt to delete non existing board ', async () => {
      const response = await request(app)
        .delete('/api/boards/7abb47cb365ecc1fdsdf8014')
        .set('Cookie', [`jwt=${token}`]);
      expect(response.status).toBe(400);
    });

    it('should delete board ', async () => {
      const testBoard = await BoardModel.create({
        title: 'test board',
        createrId: createrId,
        lists: [],
      });
      expect((await BoardModel.find({})).length).toBe(1);
      const response = await request(app)
        .delete(`/api/boards/${testBoard._id}`)
        .set('Cookie', [`jwt=${token}`]);
      expect((await BoardModel.find({})).length).toBe(0);
      expect(response.status).toBe(200);
    });

    it('shoukd return populated board', async () => {
      const board = await BoardModel.create({
        title: 'test board',
        createrId: createrId,
        lists: [],
      });

      const list = await ListModal.create({
         createrId: createrId,
          boardId: board._id,
          name: "TO DO",
          cards:[],
          pos: 16384,
        })
      
      board.lists.push(list._id)
      await board.save()
      
      const card  =  await CardModal.create({
        createrId: createrId,
        boardId: board._id,
        listId: list._id,
        name: "Shoping lists",
        description: "my favorite food",
        pos: 16384,
      })
  
      list.cards.push(card._id);
      await list.save()
  
      const  checkList = await CheckListModal.create({
        createrId: createrId,
        boardId: board._id, 
        cardId: card._id,
        checkItems: [],
        name: 'Fruits',
      })
      card.checkList = checkList._id;
      await card.save()

      const item =  await CheckListItemModal.create({
        createrId: createrId,
        checkListId: checkList._id,
        name: "Apple",
        state: 'incomplite',
        pos: 16384,
      })
      checkList.checkItems.push(item._id)
      await checkList.save()
           
      const response = await request(app).get(`/api/boards/${board._id}`).set('Cookie', [`jwt=${token}`]);
      console.log(response.body.lists[0].cards)
      expect(response.status).toBe(200);
    })

  });
});
