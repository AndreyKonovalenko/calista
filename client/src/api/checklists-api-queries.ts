import { useParams } from 'react-router';
import api from './calista-api';
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
  const { id } = useParams();
  //id - means cardId from url params
  invariantId(id);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.checklists.deleteChecklist,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['fetchCardById', id],
        exact: true,
      });
    },
  });
};

export const useReNumChecklistItemsPosInChecklist = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  //id - means cardId from url params
  invariantId(id);
  return useMutation({
    mutationFn: api.checklists.updateChecklist,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['fetchCardById', id],
        exact: true,
      });
    },
  });
};

export const useUpdateChecklist = () => {
  return useMutation({
    mutationFn: api.checklists.updateChecklist,
  });
};
