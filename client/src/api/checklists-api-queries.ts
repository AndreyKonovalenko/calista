import { useParams } from 'react-router';
import api, { TPutData } from './api';
import { invariantId } from '../utils/utils';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export const useCreateChecklist = () => {
  const { boardId, id } = useParams();
  invariantId(boardId);
  invariantId(id);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.checklists.createChecklist,
    onSuccess: () => {
      // To get all active query keys
      // const queryCache = queryClient.getQueryCache()
      // const allQueryKeys = queryCache.getAll().map(query => query.queryKey);
      // console.log(allQueryKeys)

      // for onBackground Route fetchBoardById calling in Board Page
      queryClient.invalidateQueries({
        queryKey: ['fetchBoardById', boardId],
        exact: true,
      });
      // React location.state.background pattern limitaion
      // for  empty Route there is no fetchBoardById call because no Board Page Loaded
      queryClient.invalidateQueries({
        queryKey: ['fetchCardById', id],
        exact: true,
      });
    },
  });
};

export const useDeleteChecklist = () => {
  const { cardId } = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (checklistId: string) => {
      invariantId(checklistId);
      return api.checklists.deleteChecklist(checklistId);
    },
    onSuccess: () => {
      if (cardId) {
        return queryClient.invalidateQueries({
          queryKey: ['fetchCardById', cardId],
          exact: true,
        });
      }
    },
  });
};

export const useReNumChecklistItemsPosInChecklist = () => {
  const queryClient = useQueryClient();
  const { cardId } = useParams();
  //id - means cardId from url params
  return useMutation({
    mutationFn: ({ id, data }: TPutData) => {
      invariantId(id);
      return api.checklists.updateChecklist({ id, data });
    },
    onSuccess: () => {
      if (cardId) {
        return queryClient.invalidateQueries({
          queryKey: ['fetchCardById', cardId],
          exact: true,
        });
      }
    },
  });
};

export const useUpdateChecklist = () => {
  return useMutation({
    mutationFn: api.checklists.updateChecklist,
  });
};
