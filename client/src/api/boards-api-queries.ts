import api, { TPutData } from './api';
import { useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invariantId } from '../utils/utils';
import { debugLog } from '../utils/debug';

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
    queryFn: () => {
      return api.boards.fetchBoardById(boardId);
    },
    enabled: !!boardId,
    retry: false, // ← Optional: don't retry on 404
  });
};

export const useDeleteBoard = () => {
  const {boardId} = useParams()
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:() => {
      invariantId(boardId)
      return api.boards.deleteBoard(boardId)
    }, 
    onSuccess: () => {
      if(boardId) {
        return queryClient.invalidateQueries({
        queryKey: ['fetchBoards'],
        exact: true,
      });
      }   
    },
  });
};

export const useReNumListsPosInBoard = () => {
  const { boardId } = useParams();
  debugLog('useRumListsPosInBoard', { boardId });
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { action: string }) => {
      invariantId(boardId);
      return api.boards.updateBoard({
        id: boardId,
        data: { action: data.action },
      });
    },
    onSuccess: () => {
      if (boardId) {
        return queryClient.invalidateQueries({
          queryKey: ['fetchBoardById', boardId],
          exact: true,
        });
      }
    },
  });
};

export const useUpdateBoard = () => {
  return useMutation({
    mutationFn: ({id, data}: TPutData)=> {
      invariantId(id)
      return api.boards.updateBoard({id, data})
    }, 
  });
};
