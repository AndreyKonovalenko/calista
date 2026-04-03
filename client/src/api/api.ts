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
const UPDATE_EMAIL = validEnv(process.env.UPDATE_EMAIL)
axios.defaults.baseURL = BASE_URL;

export type TData = {
  [key: string]: FormDataEntryValue | string | number | null;
};

export type TPutData = { id: string; data: TData };

// type TCustomErrorResponse = {
//   message: string;
//   stack?: string;
//   status: number;
//   success: boolean;
// };
// axios.interceptors.response.use(
//   res => {
//     return res;
//   },
//   (error: AxiosError<TCustomErrorResponse>) => {
//     if (error.response) {
//       const { data } = error.response!;
//       console.log(data.message, data.status);
//       if(data.status === 400){
//         navigate('/error-paga', {state: {massage: data.message}})
//       }
//       toast.error(data.message);
//     } else if (error.request) {
//       toast(error.request.status);
//     } else {
//       toast.error(error.message);
//     }
//     return Promise.reject(error);
//   },
// );

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body?: object) =>
    axios.post<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
  put: <T>(url: string, body?: object) =>
    axios.put<T>(url, body).then(responseBody),
  patch: <T>(url:string, body?: object)=> axios.patch<T>(url, body).then(responseBody)
};

const auth = {
  fetchUser: () => request.get<TAuthState>(AUTH),
  login: (data: TData) => request.post<TAuthState>(LOGIN, data),
  register: (data: TData) => request.post<TAuthState>(REGISTER, data),
  logout: () => request.post<void>(LOGOUT),
  verifyEmail: (token: string) =>
    request.get<{ message: string; emailVerified: boolean }>(
      `${AUTH}${VERIFY_EMAIL}?token=${token}`,
    ),
  resendLink: (data: { email: string }) =>
    request.post(`${AUTH}${VERIFY_EMAIL}`, data),
  updateEmail: (data: {email: string}) => request.patch<void>(`${AUTH}${UPDATE_EMAIL}`, data)
};

const boards = {
  fetchBoards: () => request.get<Array<IBoardTrimmed>>(BOARDS),
  createBoard: (data: TData) => request.post<void>(BOARDS, data),
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
  createCard: (data: TData) => request.post<void>(CARDS, data),
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
