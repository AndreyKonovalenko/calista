import { useParams } from 'react-router';
import api from './calista-api';
import { invariantId } from '../utils/utils';
import { useQueryClient, useMutation } from '@tanstack/react-query';

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
