import { useParams } from 'react-router';
import api, { TPutData } from './api';
import { invariantId } from '../utils/utils';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';

export const useCreateCard = () => {
  const { boardId } = useParams();
  
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { name: string; listId: string; pos: number }) => {
      invariantId(boardId)
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cardId: string) => {
      invariantId(cardId)
      return api.cards.deleteCard(cardId )
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['fetchBoardById', boardId],
        exact: true,
      });
    },
  });
};

export const useUpdateCard = () => {
  const { id: cardId } = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:({id, data}: TPutData)=> {
      invariantId(id)
      return api.cards.updateCard({id , data})
    },
    onSuccess: () => {
      if(cardId){
              return queryClient.invalidateQueries({
        queryKey: ['fetchCardById', cardId],
        exact: true,
      });
      }
    },
  });
};
