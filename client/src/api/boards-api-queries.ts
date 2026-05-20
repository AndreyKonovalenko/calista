import api from './api';
import { useParams } from 'react-router';
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
    queryFn: () => { 
      console.log('Fetching board with id:', boardId);
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
  const { id } = useParams();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { action: string }) => {
       if (!id) {
        throw new Error('Board ID is required for lists renumbering');
      }
      return api.boards.updateBoard(
        {id, data: {action: data.action}});
    },
    onSuccess: () => {
      if (id) {
        return queryClient.invalidateQueries({
          queryKey: ['fetchBoardById', id],
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
