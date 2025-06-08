import React, { useRef } from 'react';
import { Box, useTheme } from '@mui/material';
import { useBoardStore } from '../../../services/boards/board-store';
import { useDrop, useDrag } from 'react-dnd';
import { Identifier } from 'dnd-core';
import { useUpdateList } from '../../../api/lists-api-queries';
import { useReNumListsPosInBoard } from '../../../api/boards-api-queries';
// import BoardListCustomDragLayer from './board-list-custom-drag-layer';
// import { getEmptyImage } from 'react-dnd-html5-backend';
import { calculateNewPosition } from '../../../utils/utils';
import { TList, TDraggableElement } from '../../../utils/types';

const BoardListDndContainer = (
  props: TList & { children: React.ReactNode },
) => {
  const { _id, children, name, pos } = props;
  const { spacing } = useTheme();
  const {
    _id: boardId,
    setCalculatedPos,
    updateListPosByListId,
    calculatedPos,
    lists,
  } = useBoardStore(state => state);
  const ref = useRef<HTMLDivElement>(null);
  const updateListQuery = useUpdateList();
  const updateBoardById = useReNumListsPosInBoard(boardId);
  const handleUpdateListPos = (listId: string, newPos: number | null) => {
    updateListQuery.mutate({
      id: listId,
      data: { pos: newPos },
    });
  };

  const [{ isOver, itemType }, connectDrop] = useDrop<
    TDraggableElement,
    unknown,
    {
      isOver: boolean;
      itemType: Identifier | null;
    }
  >({
    accept: ['list', 'card'],
    hover({ _id: draggedId }, monitor) {
      const itemType = monitor.getItemType();
      if (itemType === 'list') {
        if (draggedId !== _id) {
          const newPos = calculateNewPosition(lists, _id, draggedId);
          setCalculatedPos(newPos);
          if (newPos && newPos !== -1) {
            updateListPosByListId(draggedId, newPos);
          }
        }
      }

      // if (cards.length === 0 && itemType === 'card') {
      //   //add card to epty card array
      // }
    },
    drop({ _id: draggedId }) {
      if (calculatedPos === -1) {
        updateBoardById.mutate({ id: _id, data: { action: 'renumbering' } });
      }
      if (calculatedPos && calculatedPos > 0) {
        handleUpdateListPos(draggedId, calculatedPos);
      }
      setCalculatedPos(null);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      itemType: monitor.getItemType(),
      differenceOffset: monitor.getDifferenceFromInitialOffset(),
    }),
  });

  const [{ isDragging }, connectDrag] = useDrag<
    TDraggableElement,
    unknown,
    { isDragging: boolean }
  >({
    type: 'list',
    item: { _id, name, pos },
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
      {isOver && itemType === 'list' && !isDragging ? (
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
