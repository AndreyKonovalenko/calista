import React, { useRef, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { useBoardStore } from '../../../services/boards/board-store';
import { useDrop, useDrag, XYCoord } from 'react-dnd';
// import { useUpdateList } from '../../../api/lists-api-queries';
import { useReNumListsPosInBoard } from '../../../api/boards-api-queries';
import { calculateNewPosition } from '../../../utils/utils';
// import BoardListCustomDragLayer from './board-list-custom-drag-layer';
import { getEmptyImage } from 'react-dnd-html5-backend';

export type TDraggableElement = {
  id: string;
  name: string;
};

const BoardListDndContainer = (props: {
  children: React.ReactNode;
  name: string;
  id: string;
}) => {
  const { id, children, name } = props;
  const { palette } = useTheme();
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
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const newPos = calculateNewPosition(lists, id, draggedId);
        if (newPos === -1) {
          updateBoardById.mutate({ id: _id, data: { action: 'renumbering' } });
        }
        if (newPos && newPos !== -1) {
          updateListPosByListId(draggedId, newPos);
          // handleUpdateListPos(draggedId, newPos);
        }
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      item: monitor.getItem(),
      differenceOffset: monitor.getDifferenceFromInitialOffset(),
    }),
  });

  const [{ isDragging }, connectDrag, preview] = useDrag<
    TDraggableElement,
    unknown,
    { isDragging: boolean }
  >({
    type: 'list',
    item: { id, name },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // mui spacing = 8; list width = spacin(34) = 272
  const threshold: number = 272 * 0.5;

  const dropGuide = (
    <Box
      sx={{
        width: 'inherit',
        height: 'inherit',
        borderRadius: 'inherit',
        opacity: '0.8',
        backgroundColor: palette.dropGuideColor.main,
      }}
    />
  );

  connectDrag(ref);
  connectDrop(ref);

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <Box
      sx={{
        height: 'inherit',
        width: 'inherit',
        borderRadius: 'inherit',
        opacity: isDragging ? 0.3 : 1,
      }}
      ref={ref}
    >
      {differenceOffset && Math.abs(differenceOffset.x) >= threshold && isOver
        ? dropGuide
        : children}
    </Box>
  );
};

export default BoardListDndContainer;
