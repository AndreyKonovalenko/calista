import api from './calista-api';
import { useParams } from 'react-router';
import { invariantId } from '../utils/utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useFetchBoards = () => {
  return useQuery({
    queryKey: ['fetchBoards'],
    queryFn: api.boards.fetchBoards,
  });
};

export const useCreateBoard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.boards.createBoard,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['fetchBoards'],
        exact: true,
      });
    },
  });
};

export const useFetchBoardById = (boardId: string) => {
  return useQuery({
    queryKey: ['fetchBoardById', boardId],
    queryFn: () => api.boards.fetchBoardById(boardId),
    enabled: !!boardId,
  });
};

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.boards.deleteBoard,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['fetchBoards'],
        exact: true,
      });
    },
  });
};

export const useReNumListsPosInBoard = () => {
  const { id } = useParams();
  invariantId(id);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.boards.updateBoard,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['fetchBoardById', id],
        exact: true,
      });
    },
  });
};

export const useUpdateBoard = () => {
  return useMutation({
    mutationFn: api.boards.updateBoard,
  });
};
