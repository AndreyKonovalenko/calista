import { useParams } from 'react-router';
import api from './api';
import { invariantId } from '../utils/utils';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';

export const useCreateCard = () => {
  const { boardId } = useParams();
  
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { name: string; listId: string; pos: number }) => {
      if (!boardId) {
        throw new Error('Board ID is required');
      }
      return api.cards.createCard({ boardId, ...data });
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['fetchBoardById', boardId],
        exact: true,
      });
    },
  });
};


export const useFetchCardById = (cardId: string) => {
  return useQuery({
    queryKey: ['fetchCardById', cardId],
    queryFn: () => api.cards.fetchCardById(cardId),
    enabled: !!cardId,
  });
};

export const useDeleteCard = () => {
  const { boardId } = useParams();
  invariantId(boardId);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.cards.deleteCard,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['fetchBoardById', boardId],
        exact: true,
      });
    },
  });
};

export const useUpdateCard = () => {
  const { id } = useParams();
  invariantId(id);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.cards.updateCard,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['fetchCardById', id],
        exact: true,
      });
    },
  });
};
