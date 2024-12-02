import axios, { AxiosResponse, AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { TUser } from '../services/user/user-store';
import { TBoard } from '../services/boards/board-store';
import { TList } from '../services/lists/list-store';
import { TForm } from './types';

const LOGIN = '/auth/login';
const LOGOUT = '/auth/logout';
const BOARDS = '/boards';
const LISTS = '/lists';

axios.defaults.baseURL = 'api/';

axios.interceptors.response.use(
	(res) => {
		return res;
	},
	(error: AxiosError) => {
		const { data } = error.response!;
		toast.error(data as String);
		return Promise.reject(error);
	}
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
	get: <T>(url: string) => axios.get<T>(url).then(responseBody),
	post: <T>(url: string, body?: {}) =>
		axios.post<T>(url, body).then(responseBody),
	delete: (url: string) => axios.delete(url).then(responseBody),
};

const auth = {
	login: (data: TForm) => request.post<TUser>(LOGIN, data),
	logout: () => request.post<void>(LOGOUT),
};

const boards = {
	fetchBoards: () => request.get<Array<TBoard>>(BOARDS),
	createBoard: (data: { title: FormDataEntryValue | null }) =>
		request.post(BOARDS, data),
	deleleBoard: (id: string) => request.delete(`${BOARDS}/${id}`),
	addListToBoard: (boardId: string, data: TForm) =>
		request.post<TList>(`${BOARDS}/${boardId}${LISTS}`, data),
};

const api = {
	auth,
	boards,
};

export default api;
