import { useParams } from 'react-router';
import api from './calista-api';
import { invariantId } from '../utils/utils';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';

export const useCreateCard = () => {
  const { id } = useParams();
  invariantId(id);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.cards.cerateCard,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['fetchBoardById', id],
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
