import React, { memo, useRef, useMemo } from 'react';
import { Box, useTheme } from '@mui/material';
// import { useBoardStore } from '../../../services/boards/board-store';
import { useDrop, useDrag } from 'react-dnd';
import { Identifier } from 'dnd-core';
// import { useUpdateList } from '../../../api/lists-api-queries';
// import { useReNumListsPosInBoard } from '../../../api/boards-api-queries';
// import BoardListCustomDragLayer from './board-list-custom-drag-layer';
// import { getEmptyImage } from 'react-dnd-html5-backend';
// import { calculateNewPosition } from '../../../utils/utils';
import { TDraggableElement, IList } from '../../../utils/types';
import { useLists, useSortedLists } from '../../../services/list-store';
import { calculateNewPosByTargetPart } from '../../../utils/utils';

const BoardListDndContainer = memo(function BoradListDndContainer(
  props: IList & { children: React.ReactNode },
) {
  const { _id, children, name, pos } = props;
  const { spacing } = useTheme();
  const lists = useLists();
  const sortedLists = useSortedLists();

  // const {
  //   setCalculatedPos,
  //   updateListPosByListId,
  //   calculatedPos,
  //   moveCard,
  //   lists,
  // } = useBoardStore(state => state);
  const ref = useRef<HTMLDivElement>(null);
  // const updateListQuery = useUpdateList();
  // const reNumListsPosInBoard = useReNumListsPosInBoard();
  // const handleUpdateListPos = (listId: string, newPos: number | null) => {
  //   updateListQuery.mutate({
  //     id: listId,
  //     data: { pos: newPos },
  //   });
  // };

  const [{ isOver, itemType }, connectDrop] = useDrop<
    TDraggableElement,
    unknown,
    {
      isOver: boolean;
      itemType: Identifier | null;
    }
  >(
    {
      accept: ['list', 'card'],
      hover({ _id: draggedId }, monitor) {
        const itemType = monitor.getItemType();
        if (itemType === 'list') {
          if (!ref.current || draggedId === _id || !lists || !sortedLists) {
            return;
          }

          // Determine rectangle on screen
          const hoverBoundingRect = ref.current.getBoundingClientRect();
          // Get vertical middle
          const hoverMiddleX =
            (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
          // Determine mouse position
          const clientOffset = monitor.getClientOffset();
          // Get pixels to the top
          if (!clientOffset) {
            return;
          }
          const hoverClientX = clientOffset.x - hoverBoundingRect.left;
          const targetPart = hoverClientX > hoverMiddleX ? 'before' : 'after';
          const newPos = calculateNewPosByTargetPart(
            lists,
            sortedLists,
            _id,
            targetPart,
          );
          console.log(newPos);

          // if (draggedId !== _id) {
          //   const newPos = calculateNewPosition(lists, _id, draggedId);
          //   setCalculatedPos(newPos);
          //   if (newPos && newPos !== -1) {
          //     updateListPosByListId(draggedId, newPos);
          //   }
          // }
        }

        if (itemType === 'card') {
          // if (Object.keys(lists[_id].cards).length === 0)
          //   moveCard(draggedId, _id, 16384);
        }
      },
      drop({ _id: draggedId }) {
        console.log(draggedId);
        // if (calculatedPos === -1) {
        //   reNumListsPosInBoard.mutate({
        //     id: _id,
        //     data: { action: 'renumbering' },
        //   });
        // }
        // if (calculatedPos && calculatedPos > 0) {
        //   if (itemType === 'lists') {
        //     handleUpdateListPos(draggedId, calculatedPos);
        //   }
        // }
        // setCalculatedPos(null);
      },
      collect: monitor => ({
        isOver: monitor.isOver({ shallow: true }),
        itemType: monitor.getItemType(),
        differenceOffset: monitor.getDifferenceFromInitialOffset(),
      }),
    },
    [_id, sortedLists, lists, calculateNewPosByTargetPart],
  );

  const [{ isDragging }, connectDrag] = useDrag<
    TDraggableElement,
    unknown,
    { isDragging: boolean }
  >(
    {
      type: 'list',
      item: { _id, name, pos },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    },
    [_id],
  );

  const dragStyle = useMemo(
    () => ({
      borderRadius: 'inherit',
      height: '100%',
      width: spacing(34),
      opacity: isDragging ? 0.3 : 1,
    }),
    [isDragging],
  );

  const style = {
    filter: 'brightness(0)',
    opacity: 0.2,
    borderRadius: 'inherit',
  };

  connectDrag(ref);
  connectDrop(ref);

  return (
    <Box sx={dragStyle} ref={ref}>
      {isOver && itemType === 'list' && !isDragging ? (
        <Box sx={style}>{children}</Box>
      ) : (
        children
      )}
    </Box>
  );
});

export default BoardListDndContainer;
