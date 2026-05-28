import { useParams } from 'react-router';
import api, { TData } from './api';
import { invariantId } from '../utils/utils';
import { useQueryClient, useMutation } from '@tanstack/react-query';

// export const useCreateChecklistItem = () => {
//   const { cardId, boardId } = useParams();
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (data: TData) =>  {
//       invariantId(cardId)  
//       return api.checklistItems.createChecklistItem(data)
//     },
//     onSuccess: () => {
//       // To get all active query keys
//       // const queryCache = queryClient.getQueryCache()
//       // const allQueryKeys = queryCache.getAll().map(query => query.queryKey);
//       // console.log(allQueryKeys)

//       // for onBackground Route fetchBoardById calling in Board Page
//       if(boardId) {
//         queryClient.invalidateQueries({
//         queryKey: ['fetchBoardById', boardId],
//         exact: true,
//       });

//       }

//       // React location.state.background pattern limitaion
//       // for  empty Route there is no fetchBoardById call because no Board Page Loaded
//       if(cardId) {
//         queryClient.invalidateQueries({
//         queryKey: ['fetchCardById', cardId],
//         exact: true,
//         }); 
//       }  
//     },
//   });
// };


// First, update the hook
export const useCreateChecklistItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: TData) => {
      // No useParams here! Just use what's passed
      return api.checklistItems.createChecklistItem(data);
    },
    onSuccess: (_, variables) => {
      // variables contains everything passed to mutate()
       // for onBackground Route fetchBoardById calling in Board Page
      if(variables.boardId) {
        queryClient.invalidateQueries({
          queryKey: ['fetchBoardById', variables.boardId],
          exact: true,
        });
      }
       // React location.state.background pattern limitaion
       // for  empty Route there is no fetchBoardById call because no Board Page Loaded
      if(variables.cardId) {
        queryClient.invalidateQueries({
          queryKey: ['fetchCardById', variables.cardId],
          exact: true,
        });
      }
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
