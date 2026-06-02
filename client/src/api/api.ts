import axios, { AxiosResponse } from 'axios';
// import { toast } from 'react-toastify';
import { TAuthState } from '../services/auth-store';
// import { useNavigate } from 'react-router';
import {
  IBoard,
  ICard,
  IBoardTrimmed,
  IList,
  IChecklist,
  IChecklistItem,
} from '../utils/types';
import validEnv from '../utils/utils';

const BASE_URL = validEnv(process.env.BASE_URL);
const LOGIN = validEnv(process.env.LOGIN);
const REGISTER = validEnv(process.env.REGISTER);
const LOGOUT = validEnv(process.env.LOGOUT);
const LISTS = validEnv(process.env.LISTS);
const BOARDS = validEnv(process.env.BOARDS);
const CARDS = validEnv(process.env.CARDS);
const AUTH = validEnv(process.env.AUTH);
const SSE = validEnv(process.env.SSE);
const CHECKLISTS = validEnv(process.env.CHECKLISTS);
const CHECKLIST_ITEMS = validEnv(process.env.CHECKLIST_ITEMS);
const VERIFY_EMAIL = validEnv(process.env.VERIFY_EMAIL);
const VERIFY_PENDING_EMAIL = validEnv(process.env.VERIFY_PENDING_EMAIL);
const CHANGE_EMAIL = validEnv(process.env.CHANGE_EMAIL);
axios.defaults.baseURL = BASE_URL;




export type TApiPayload = Record<string, string | number | FormDataEntryValue | null> ;

export type TApiUpdatePayload = { id: string; data: TApiPayload };




type TFetchUserResponse = {
  _id:string;
  username: string,
  email: string
}

type TFetchBoardsResponse = {
  boards: Array<{_id: string, name: string}>
}

type TFetchBoardResponse = {
  board: IBoard;
  lists: Record<string, IList>;
  cards: Record<string, ICard>;
  checklists: Record<string, IChecklist>;
  checklistItems: Record<string, IChecklistItem> 
}

type TFetchCardRrespose = {
  card: ICard;
  checklists: Record<string, IChecklist>;
  checklistItems: Record<string, IChecklistItem>;
}

type TVerifyEmailResponse = {
  message: string;
  emailVerified: boolean;
};

type TApiLoginPayload = {
  username: string;
  password: string;
}
type TApiRegisterPayload = {
  username: string;
  email: string, 
  password: string,
}
type TApiBoardPayload = {
  name: string
}

type TApiListPayload = {
  boardId: string;
  name: string;
  pos: number;
};
type TApiCardPayload = {
  boardId: string;
  listId: string;
  name: string;
  pos: number;
};
type TApiChecklistPayload = {
  boardId: string;
  listId: string;
  cardId: string;
  name: string;
  pos: number;
};
type TApiChecklistItemPayload = {
  boardId: string;
  listId: string;
  cardId: string;
  checklistId: string;
  name: string;
  pos: number;
};


const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body?: object) =>
    axios.post<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
  put: <T>(url: string, body?: object) =>
    axios.put<T>(url, body).then(responseBody),
  patch: <T>(url: string, body?: object) =>
    axios.patch<T>(url, body).then(responseBody),
};

const auth = {
  fetchUser: () => request.get<TFetchUserResponse >(AUTH),
  login: (data: TApiLoginPayload) => request.post<TAuthState>(LOGIN, data),
  register: (data: TApiRegisterPayload) => request.post<TAuthState>(REGISTER, data),
  logout: () => request.post<void>(LOGOUT),
  verifyEmail: (token: string) =>
    request.get<TVerifyEmailResponse>(
      `${AUTH}${VERIFY_EMAIL}?token=${token}`,
    ),
  verifyPendingEmail: (token: string) =>
    request.get<TVerifyEmailResponse>(
      `${AUTH}${VERIFY_PENDING_EMAIL}?token=${token}`,
    ),
  resendLink: (data: { email: string }) =>
    request.post(`${AUTH}${VERIFY_EMAIL}`, data),
  updateEmail: (data: { pendingEmail: string }) =>
    request.patch<void>(`${AUTH}${CHANGE_EMAIL}`, data),
};

const boards = {
  fetchBoards: () => request.get<Array<IBoardTrimmed>>(BOARDS),
  createBoard: (data: TApiBoardPayload) => request.post<void>(BOARDS, data),
  fetchBoardById: (id: string) =>
    request.get<{
      board: IBoard;
      lists: { [key: string]: IList };
      cards: { [key: string]: ICard };
      checklists: { [key: string]: IChecklist };
      checklistItems: { [key: string]: IChecklistItem };
    }>(`${BOARDS}/${id}`),
  deleteBoard: (id: string) => request.delete<void>(`${BOARDS}/${id}`),
  updateBoard: ({ id, data }: TPutData) =>
    request.put<void>(`${BOARDS}/${id}`, data),
};

const lists = {
  createList: (data: TData) => request.post<void>(LISTS, data),
  // fetchListById: (id: string) => {
  //   request.get<IList>(`${LISTS}/${id}`);
  // },
  deleteList: (id: string) => request.delete<void>(`${LISTS}/${id}`),
  updateList: ({ id, data }: TPutData) =>
    request.put<void>(`${LISTS}/${id}`, data),
};

const cards = {
  createCard: (data: {
    boardId: string;
    name: string;
    listId: string;
    pos: number;
  }) => request.post<void>(CARDS, data),
  fetchCardById: (id: string) =>
    request.get<{
      card: ICard;
      checklists: { [key: string]: IChecklist };
      checklistItems: { [key: string]: IChecklistItem };
    }>(`${CARDS}/${id}`),
  deleteCard: (id: string) => request.delete<void>(`${CARDS}/${id}`),
  updateCard: ({ id, data }: TPutData) =>
    request.put<void>(`${CARDS}/${id}`, data),
};

const checklists = {
  createChecklist: (data: TData) => request.post<void>(CHECKLISTS, data),
  deleteChecklist: (id: string) => request.delete<void>(`${CHECKLISTS}/${id}`),
  updateChecklist: ({ id, data }: TPutData) =>
    request.put<void>(`${CHECKLISTS}/${id}`, data),
};

const checklistItems = {
  createChecklistItem: (data: TData) =>
    request.post<void>(CHECKLIST_ITEMS, data),
  deleteChecklistItem: (id: string) =>
    request.delete<void>(`${CHECKLIST_ITEMS}/${id}`),
  updateChecklistItem: ({ id, data }: TPutData) =>
    request.put<void>(`${CHECKLIST_ITEMS}/${id}`, data),
};

const sse = {
  setConnection: () =>
    new EventSource(BASE_URL + SSE, { withCredentials: true }),
};

const api = {
  auth,
  boards,
  lists,
  cards,
  checklists,
  checklistItems,
  sse,
};

export default api;
