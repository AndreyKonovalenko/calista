import api from './calista-api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateList = (boardId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.lists.cerateList,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['fetchBoardById', boardId],
        exact: true,
      });
    },
  });
};

export const useFetchListById = (listId: string) => {
  return useQuery({
    queryKey: ['fetchListById', listId],
    queryFn: () => api.lists.fetchListById(listId),
    enabled: !!listId,
  });
};

export const useDeleteList = (boardId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.lists.deleteList,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['fetchBoardById', boardId],
        exact: true,
      });
    },
  });
};

export const useUpdateList = (boardId: string) => {
  console.log(boardId)
  return useMutation({
    mutationFn: api.lists.updateList
  })
  // const queryClient = useQueryClient();
  // return useMutation({
  //   mutationFn: api.lists.updateList,
  //   onSuccess: () => {
  //     return queryClient.invalidateQueries({
  //       queryKey: ['fetchBoardById', boardId],
  //       exact: true,
  //     });
  //   },
  // });
};
