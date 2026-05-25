import api, { TPutData } from './api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { invariantId } from '../utils/utils';
import { useLists, useSortedLists } from '../services/list-store';

export const useCreateList = () => {
  const { id: boardId } = useParams();
  const queryClient = useQueryClient();
  const lists = useLists(); // Get lists from store
  const sortedList = useSortedLists();

  return useMutation({
    mutationFn: (data: { name: string }) => {
      if (!boardId) {
        throw new Error('Board ID is required');
      }

      // Calculate pos inside the hook
      let pos = 16384;
      if (lists && sortedList && sortedList?.length > 0) {
        pos = lists[sortedList[sortedList.length - 1]].pos + pos;
      }
      return api.lists.createList({ boardId, name: data.name, pos });
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
  const { id: boardId } = useParams();
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
  const { id: boardId } = useParams();
  return useMutation({
    mutationFn: ({id, data}: TPutData)=> {
      invariantId(id)
      return api.lists.updateList({id, data})
    }, 
    onSuccess: () => {
      if(boardId){
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
    mutationFn: ({id, data}: TPutData) => { 
      invariantId(id)
      return api.lists.updateList({id, data})}
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
