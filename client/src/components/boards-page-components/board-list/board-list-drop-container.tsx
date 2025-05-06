import React, { useRef } from 'react';
import { Box, useTheme } from '@mui/material';
import { useBoardStore } from '../../../services/boards/board-store';
import { useDrop, XYCoord } from 'react-dnd';
// import { useUpdateList } from '../../../api/lists-api-queries';
import { useReNumListsPosInBoard } from '../../../api/boards-api-queries';
import { calculateNewPosition } from '../../../utils/utils';
import { TDraggableElement } from './board-list-draggable';
// import BoardListCustomDragLayer from './board-list-custom-drag-layer';

const BoardListDropContainer = (props: {
  children: React.ReactNode;
  id: string;
}) => {
  const { id, children } = props;
  const { spacing, palette } = useTheme();
  const { _id, lists, updateListPosByListId } = useBoardStore(state => state);
  const ref = useRef<HTMLDivElement>(null);
  // const updateListQuery = useUpdateList();
  const updateBoardById = useReNumListsPosInBoard(_id);
  // const handleUpdateListPos = (listId: string, newPos: number) => {
  //   updateListQuery.mutate({
  //     id: listId,
  //     data: { pos: newPos },
  //   });
  // };

  const [{ isOver, differenceOffset }, connectDrop] = useDrop<
    TDraggableElement,
    unknown,
    {
      isOver: boolean;
      differenceOffset: XYCoord | null;
    }
  >({
    accept: 'list',
    drop(item, monitor) {
      console.log(item)
      console.log(monitor.getDropResult())
      // need to add backend request logic
      return undefined;
    },
    hover({ id: draggedId },monitor) {
      if (draggedId !== id) {
        const newPos = calculateNewPosition(lists, id, draggedId);
        if (newPos === -1) {
          updateBoardById.mutate({ id: _id, data: { action: 'renumbering' } });
        }
        if (newPos && newPos !== -1) {
          updateListPosByListId(draggedId, newPos);
          // handleUpdateListPos(draggedId, newPos);
        }
        console.log(draggedId)
        console.log(monitor.canDrop())

      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      item: monitor.getItem(),
      differenceOffset: monitor.getDifferenceFromInitialOffset(),
    }),
  });

  // mui spacing = 8; list width = spacin(34) = 272
  const threshold: number = 272 * 0.5;

  connectDrop(ref);
  const dropGuide = (
    <Box
      sx={{
        width: spacing(34),
        height: '100%',
        borderRadius: spacing(2),
        opacity: '0.8',
        backgroundColor: palette.dropGuideColor.main,
      }}
    />
  );

  return (
    <Box
      sx={{
        height: 'inherit',
        width: 'inherit',
      }}
      ref={ref}
    >
      {differenceOffset && Math.abs(differenceOffset.x) >= threshold && isOver
        ? dropGuide
        : children}
    </Box>
  );
};

export default BoardListDropContainer;
