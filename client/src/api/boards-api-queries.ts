import api from './calista-api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useFetchBoardById = (boardId: string | undefined) => {
  return useQuery({
    queryKey: ['boardById', boardId],
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
        queryKey: ['boards'],
        exact: true,
      });
    },
  });
};
