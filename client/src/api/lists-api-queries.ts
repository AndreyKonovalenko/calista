import api from './calista-api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.lists.cerateList,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['createList'],
        exact: true,
      });
    },
  });
};

export const useFetchListById = (listId: string | undefined) => {
  return useQuery({
    queryKey: ['fetchListById', listId],
    queryFn: () => api.lists.fetchListById(listId),
    enabled: !!listId,
  });
};

export const useDeleteLest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.lists.deletList,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['deleteList'],
        exact: true,
      });
    },
  });
};
