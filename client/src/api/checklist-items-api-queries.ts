import { useParams } from 'react-router';
import api from './calista-api';
import { invariantId } from '../utils/utils';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export const useCreateChecklistItem = () => {
  const { id } = useParams();
  invariantId(id);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.checklistItems.createChecklistItem,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['fetchCardById', id],
        exact: true,
      });
    },
  });
};

export const useDeleteChecklistItem = () => {
  const { id } = useParams();
  //id - means cardId from url params
  invariantId(id);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.checklistItems.deleteChecklistItem,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['fetchCardById', id],
        exact: true,
      });
    },
  });
};

export const useUpdateChecklistItem = () => {
  return useMutation({
    mutationFn: api.checklistItems.updateChecklistItem,
  });
};
