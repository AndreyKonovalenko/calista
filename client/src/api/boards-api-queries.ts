import api from './api';
import { useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invariantId } from '../utils/utils';

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
      return api.boards.fetchBoardById(boardId)},
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

// export const useReNumListsPosInBoard = () => {
//   const { id } = useParams();
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (data: {action: string}) => {
//       if(!id){
//         throw new Error('Board ID is required for list renumbering')
//       }
//       return api.boards.updateBoard(id, data),
//     },    
//     onSuccess: () => {
//       return queryClient.invalidateQueries({
//         queryKey: ['fetchBoardById', id],
//         exact: true,
//       });
//     },
//   });
// };

export const useReNumListsPosInBoard = () => {
  const { id: boardId } = useParams();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { action: string }) => {
      invariantId(boardId)
      return api.boards.updateBoard(
        {id: boardId, data: {action: data.action}});
    },
    onSuccess: () => {
      if (boardId) {
        return queryClient.invalidateQueries({
          queryKey: ['fetchBoardById', boardId],
          exact: true,
        });
      }
    }
  });
};

export const useUpdateBoard = () => {
  return useMutation({
    mutationFn: api.boards.updateBoard,
  });
};
