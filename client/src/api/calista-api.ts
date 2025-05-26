import axios, { AxiosResponse, AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { TAuthState } from '../services/auth/auth-store';
import { IBoard } from '../services/boards/board-store';
import { IList } from '../services/lists/list-store';
import { ICard } from '../services/cards/card-store';
import validEnv from '../utils/utils';

const BASE_URL = validEnv(process.env.BASE_URL);
const LOGIN = validEnv(process.env.LOGIN);
const LOGOUT = validEnv(process.env.LOGOUT);
const LISTS = validEnv(process.env.LISTS);
const BOARDS = validEnv(process.env.BOARDS);
const CARDS = validEnv(process.env.CARDS);
const AUTH = validEnv(process.env.AUTH);
const SSE = validEnv(process.env.SSE);
axios.defaults.baseURL = BASE_URL;

type TData = {
  [key: string]: FormDataEntryValue | string | number | null;
};

type TPutData = { id: string; data: TData };

type TCustomErrorResponse = {
  message: string;
  stack?: string;
  status: number;
  success: boolean;
};
axios.interceptors.response.use(
  res => {
    return res;
  },
  (error: AxiosError<TCustomErrorResponse>) => {
    if (error.response) {
      const { data } = error.response!;
      console.log(data.message);
      toast.error(data.message);
    } else if (error.request) {
      toast(error.request.status);
    } else {
      toast.error(error.message);
    }
    return Promise.reject(error);
  },
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body?: object) =>
    axios.post<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
  put: <T>(url: string, body?: object) =>
    axios.put<T>(url, body).then(responseBody),
};

const auth = {
  fetchUser: () => request.get<TAuthState>(AUTH),
  login: (data: TData) => request.post<TAuthState>(LOGIN, data),
  logout: () => request.post<void>(LOGOUT),
};

const boards = {
  fetchBoards: () => request.get<Array<{ _id: string; name: string }>>(BOARDS),
  createBoard: (data: TData) => request.post<void>(BOARDS, data),
  fetchBoardById: (id: string) => request.get<IBoard>(`${BOARDS}/${id}`),
  deleteBoard: (id: string) => request.delete<void>(`${BOARDS}/${id}`),
  updateBoard: ({ id, data }: TPutData) =>
    request.put<void>(`${BOARDS}/${id}`, data),
};

const lists = {
  cerateList: (data: TData) => request.post<void>(LISTS, data),
  fetchListById: (id: string) => {
    request.get<IList>(`${LISTS}/${id}`);
  },
  deleteList: (id: string) => request.delete<void>(`${LISTS}/${id}`),
  updateList: ({ id, data }: TPutData) =>
    request.put<void>(`${LISTS}/${id}`, data),
};

const cards = {
  cerateCard: (data: TData) => request.post<void>(CARDS, data),
  fetchCardById: (id: string) => request.get<ICard>(`${CARDS}/${id}`),
  deleteCard: (id: string) => request.delete<void>(`${CARDS}/${id}`),
};

// listsRouter.post('/', protect, addList);
// listsRouter.get('/:id', protect, getList);
// listsRouter.put('/:id', protect, updateList);
// listsRouter.delete('/:id', protect, deleteList);

const sse = {
  setConnection: () =>
    new EventSource(BASE_URL + SSE, { withCredentials: true }),
};

const api = {
  auth,
  boards,
  lists,
  cards,
  sse,
};

export default api;
