import { useParams } from 'react-router';
import api from './calista-api';
import { invariantId } from '../utils/utils';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export const useCreateChecklist = () => {
  const { id } = useParams();
  invariantId(id);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.checklists.createChecklist,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['fetchCardById', id],
        exact: true,
      });
    },
  });
};

// export const useFetchCardById = (cardId: string) => {
//   return useQuery({
//     queryKey: ['fetchCardById', cardId],
//     queryFn: () => api.cards.fetchCardById(cardId),
//     enabled: !!cardId,
//   });
// };

export const useDeleteChecklist = () => {
  const { id } = useParams();
  //id - means cardId from url params
  invariantId(id);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.cards.deleteCard,
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
