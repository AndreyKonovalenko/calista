import { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { TDraggableElement } from '../components/boards-page-components/board-list/board-list-dnd-container';

const handleDropOutside = (item: TDraggableElement) => {
  console.log('Droped outside', item);
};

export const useGlobalDrop = () => {
  const [, connectDrop] = useDrop<TDraggableElement, unknown>({
    accept: 'list',
    drop: (item, monitor) => {
      if (monitor.isOver({ shallow: true })) handleDropOutside(item);
    },
  });

  useEffect(() => {
    connectDrop(document.body);
    return () => {
      connectDrop(null);
    };
  }, [connectDrop]);
};
