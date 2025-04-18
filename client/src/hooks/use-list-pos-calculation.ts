import { useBoardStore } from '../services/boards/board-store';
import { useUpdateList } from '../api/lists-api-queries';
import { ascendingComparator } from '../services/boards/board-store';

export const useListPosCalculation = (dropId: string, dragId: string) => {
  const updateListQuery = useUpdateList();
  const { _id, lists } = useBoardStore(state => state);

  const dropElement = lists.find(element => element._id === dropId);
  const dragElement = lists.find(element => element._id === dragId);

  if (!dropElement || !dragElement) {
    return;
  }

  const dropIndex = lists.indexOf(dropElement);
  const dragIndex = lists.indexOf(dragElement);
  const { pos } = dropElement;
  const start = Boolean(dropIndex === 0);
  const end = Boolean(dropIndex === lists.length - 1);

  if (start) {
    console.log('start case');
    return Math.trunc(lists[0].pos / 2);
  }
  if (end) {
    console.log('end case');
    return lists[lists.length - 1].pos + 16384;
  }
  // drag from right to left
  if (dragIndex < dropIndex) {
    const neighbourPos = lists[dropIndex + 1].pos;
    const newPos = Math.trunc((pos + neighbourPos) / 2);
    if (Math.abs(newPos - pos) <= 5 || Math.abs(newPos - neighbourPos) <= 5) {
      const sortedLists = lists.sort(ascendingComparator);
      let defaultPos = 16384;
      for (const list of sortedLists) {
        updateListQuery.mutate({
          id: list._id,
          data: { pos: defaultPos },
        });
        defaultPos = defaultPos + 16384;
      }
    } else {
      return newPos;
    }
  }
  // drag from left to right
  if (dragIndex > dropIndex) {
    const neighbourPos = lists[dropIndex - 1].pos;
    const newPos = Math.trunc((pos + neighbourPos) / 2);
    if (Math.abs(newPos - pos) <= 5 || Math.abs(newPos - neighbourPos) <= 5) {
      const sortedLists = lists.sort(ascendingComparator);
      let defaultPos = 16384;
      for (const list of sortedLists) {
        updateListQuery.mutate({
          id: list._id,
          data: { pos: defaultPos },
        });
        defaultPos = defaultPos + 16384;
      }
    } else {
      return newPos;
    }
  }
};
