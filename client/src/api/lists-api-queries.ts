import api, { TApiListPayload, TApiUpdatePayload } from './api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { invariantId } from '../utils/utils';

export const useCreateList = () => {
  const { boardId } = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TApiListPayload) => {
      return api.lists.createList(data);
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

// export const useFetchListById = (listId: string) => {
//   return useQuery({
//     queryKey: ['fetchListById', listId],
//     queryFn: () => api.lists.fetchListById(listId),
//     enabled: !!listId,
//   });
// };

export const useDeleteList = () => {
  const { boardId } = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (listId: string) => {
      invariantId(listId);
      return api.lists.deleteList(listId);
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

export const useReNumCardsPosInList = () => {
  const queryClient = useQueryClient();
  const { boardId } = useParams();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { action: string } }) => {
      invariantId(id);
      return api.lists.updateList({ id, data });
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

export const useUpdateList = () => {
  return useMutation({
    mutationFn: ({ id, data }: TApiUpdatePayload) => {
      invariantId(id);
      return api.lists.updateList({ id, data });
    },
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
