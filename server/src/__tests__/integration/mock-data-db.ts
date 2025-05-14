import { UserModel } from '../../models/UserModel';
import { BoardModel } from '../../models/BoardModel';
import { ListModel } from '../../models/ListModel';
import { CheckListItemModel } from '../../models/CheckListModel';
import { CheckListModel } from '../../models/CheckListModel';
import { CardModel } from '../../models/CardModel';

export async function setUpMockDb() {
  const testUser = {
    username: 'Marck.7_cker-berg',
    password: 'M@rck_Zucker-Ber%$111',
  };

  const user = await UserModel.create(testUser);
  if (!user) {
    throw Error('mock db date setup error');
  }

  const board = await BoardModel.create({
    name: 'test board',
    createrId: user._id,
    lists: [],
  });

  const firstList = await ListModel.create({
    createrId: user._id,
    boardId: board._id,
    name: 'DONE',
    cards: [],
    pos: 77824,
  });

  board.lists.push(firstList._id);
  await board.save();

  const secondList = await ListModel.create({
    createrId: user._id,
    boardId: board._id,
    name: 'IN PROGRESS',
    cards: [],
    pos: 86016,
  });

  board.lists.push(secondList._id);
  await board.save();

  const list = await ListModel.create({
    createrId: user._id,
    boardId: board._id,
    name: 'TO DO',
    cards: [],
    pos: 16384,
  });
  board.lists.push(list._id);
  await board.save();

  const card = await CardModel.create({
    createrId: user._id,
    boardId: board._id,
    listId: list._id,
    name: 'Shoping list',
    description: 'buy food in local grocery store accoring list',
    checkLists: [],
    pos: 16384,
  });
  list.cards.push(card._id);
  await list.save();

  const checkList = await CheckListModel.create({
    createrId: user._id,
    boardId: board._id,
    listId: list._id,
    cardId: card._id,
    checkItems: [],
    name: 'Fruits',
  });
  card.checkLists.push(checkList._id);
  await card.save();

  const item = await CheckListItemModel.create({
    createrId: user._id,
    checkListId: checkList._id,
    boardId: board._id,
    listId: list._id,
    cardId: card._id,
    name: 'Apple',
    state: 'incomplite',
    pos: 16384,
  });
  checkList.checkItems.push(item._id);

  await checkList.save();
}
