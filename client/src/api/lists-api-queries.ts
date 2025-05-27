import api from './calista-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { invariantId } from '../utils/utils';

export const useCreateList = () => {
  const { id } = useParams();
  invariantId(id);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.lists.cerateList,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['fetchBoardById', id],
        exact: true,
      });
    },
  });
};

// export const useFetchListById = (listId: string) => {
//   return useQuery({
//     queryKey: ['fetchListById', listId],
//     queryFn: () => api.lists.fetchListById(listId),
//     enabled: !!listId,
//   });
// };

export const useDeleteList = () => {
  const { id } = useParams();
  invariantId(id);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.lists.deleteList,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['fetchBoardById', id],
        exact: true,
      });
    },
  });
};

export const useUpdateList = () => {
  return useMutation({
    mutationFn: api.lists.updateList,
  });
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
