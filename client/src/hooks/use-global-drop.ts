import { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { TDraggableElement } from '../utils/types';

const handleDropOutside = (item: TDraggableElement) => {
  console.log('Droped outside', item);
};

export const useGlobalDrop = () => {
  const [, connectDrop] = useDrop<TDraggableElement, unknown>({
    accept: 'list',
    drop: (item, monitor) => {
      if (monitor.isOver({ shallow: true })) handleDropOutside(item);
      const didDrop = monitor.didDrop();
      if (didDrop) {
        console.log('doped on child');
      }
    },
  });

  useEffect(() => {
    connectDrop(document.body);
    return () => {
      connectDrop(null);
    };
  }, [connectDrop]);
};
