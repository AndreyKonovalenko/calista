import React, { useRef } from 'react';
import { Box, useTheme } from '@mui/material';
import { useBoardStore } from '../../../services/boards/board-store';
import { useDrop, useDrag } from 'react-dnd';
import { useUpdateList } from '../../../api/lists-api-queries';
import { useReNumListsPosInBoard } from '../../../api/boards-api-queries';
// import BoardListCustomDragLayer from './board-list-custom-drag-layer';
// import { getEmptyImage } from 'react-dnd-html5-backend';
import { calculateNewPosition } from '../../../utils/utils';

export type TDraggableElement = {
  id: string;
  name: string;
  pos: number;
};

const BoardListDndContainer = (props: {
  children: React.ReactNode;
  name: string;
  id: string;
  cards: Array<{ _id: string; name: string; pos: number }>;
  pos: number;
}) => {
  const { id, children, name, pos, cards } = props;
  const { spacing } = useTheme();
  const {
    updateListPosByListId,
    lists,
    _id,
    setCalculatedListPos,
    calculatedListPos,
  } = useBoardStore(state => state);
  const ref = useRef<HTMLDivElement>(null);
  const updateListQuery = useUpdateList();
  const updateBoardById = useReNumListsPosInBoard(_id);
  const handleUpdateListPos = (listId: string, newPos: number) => {
    updateListQuery.mutate({
      id: listId,
      data: { pos: newPos },
    });
  };

  const [{ isOver }, connectDrop] = useDrop<
    TDraggableElement,
    unknown,
    {
      isOver: boolean;
    }
  >({
    accept: ['list', 'cards'],
    hover({ id: draggedId }, monitor) {
      const itemType = monitor.getItemType();
      console.log(itemType);
      if (itemType === 'list') {
        if (draggedId !== id) {
          const newPos = calculateNewPosition(lists, id, draggedId);
          setCalculatedListPos(newPos);
          if (newPos && newPos !== -1) {
            updateListPosByListId(draggedId, newPos);
          }
        }
      }

      if (cards.length === 0 && itemType === 'card') {
        //add card to epty card array
      }
    },
    drop({ id: draggedId }) {
      console.log('did drop', calculatedListPos);
      if (calculatedListPos === -1) {
        updateBoardById.mutate({ id: _id, data: { action: 'renumbering' } });
      }
      if (calculatedListPos != undefined && calculatedListPos > 0) {
        handleUpdateListPos(draggedId, calculatedListPos);
      }
      setCalculatedListPos(undefined);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      differenceOffset: monitor.getDifferenceFromInitialOffset(),
    }),
  });

  const [{ isDragging }, connectDrag] = useDrag<
    TDraggableElement,
    unknown,
    { isDragging: boolean }
  >({
    type: 'list',
    item: { id, name, pos },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  connectDrag(ref);
  connectDrop(ref);

  // useEffect(() => {
  //   preview(getEmptyImage(), { captureDraggingState: true });
  // }, [preview]);

  return (
    <Box
      sx={{
        borderRadius: 'inherit',
        height: '100%',
        width: spacing(34),
        opacity: isDragging ? 0.3 : 1,
      }}
      ref={ref}
    >
      {isOver && !isDragging ? (
        <Box
          sx={{
            filter: 'brightness(0)',
            opacity: 0.2,
            borderRadius: 'inherit',
          }}
        >
          {children}
        </Box>
      ) : (
        children
      )}
    </Box>
  );
};

export default BoardListDndContainer;
