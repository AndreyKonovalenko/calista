import axios, { AxiosResponse, AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { TAuthState } from '../services/auth/auth-store';
import { TBoard } from '../services/boards/board-store';
import { TList } from '../services/lists/list-store';
import { TForm } from '../utils/types';
import validEnv from '../utils/utils';

const BASE_URL = validEnv(process.env.BASE_URL);
const LOGIN = validEnv(process.env.LOGIN);
const LOGOUT = validEnv(process.env.LOGOUT);
const LISTS = validEnv(process.env.LISTS);
const BOARDS = validEnv(process.env.BOARDS);
const AUTH = validEnv(process.env.AUTH);
const SSE = validEnv(process.env.SSE);
axios.defaults.baseURL = BASE_URL;

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
};

const auth = {
  fetchUser: () => request.get<TAuthState>(AUTH),
  login: (data: TForm) => request.post<TAuthState>(LOGIN, data),
  logout: () => request.post<void>(LOGOUT),
};

const boards = {
  fetchBoards: () => request.get<Array<TBoard>>(BOARDS),
  createBoard: (data: { name: FormDataEntryValue | null }) =>
    request.post<void>(BOARDS, data),
  fetchBoardById: (id: string | undefined) =>
    request.get<TBoard>(`${BOARDS}/${id}`),
  deleteBoard: (id: string | undefined) =>
    request.delete<void>(`${BOARDS}/${id}`),
  addListToBoard: (boardId: string, data: TForm) =>
    request.post<TList>(`${BOARDS}/${boardId}${LISTS}`, data),
};

const sse = {
  setConnection: () =>
    new EventSource(BASE_URL + SSE, { withCredentials: true }),
};

const api = {
  auth,
  boards,
  sse,
};

export default api;
