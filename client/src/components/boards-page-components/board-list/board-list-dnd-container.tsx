import React, { useRef } from 'react';
import { Box, useTheme } from '@mui/material';
import { useBoardStore } from '../../../services/boards/board-store';
import { useDrop, useDrag } from 'react-dnd';
// import { useUpdateList } from '../../../api/lists-api-queries';
// import BoardListCustomDragLayer from './board-list-custom-drag-layer';
// import { getEmptyImage } from 'react-dnd-html5-backend';

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
  const { updateListsOrder, updateListPosByListId } = useBoardStore(state => state);
  const ref = useRef<HTMLDivElement>(null);

  // const updateListQuery = useUpdateList();
  // const updateBoardById = useReNumListsPosInBoard(_id);
  // const handleUpdateListPos = (listId: string, newPos: number) => {
  //   updateListQuery.mutate({
  //     id: listId,
  //     data: { pos: newPos },
  //   });
  // };

  const [{ isOver }, connectDrop] = useDrop<
    TDraggableElement,
    unknown,
    {
      isOver: boolean;
    }
  >({
    accept: 'list',
    hover({ id: draggedId }) {
      if (draggedId !== id) {

        // const newPos = calculateNewPosition(lists, id, draggedId);
        // if (newPos === -1) {
        //   updateBoardById.mutate({ id: _id, data: { action: 'renumbering' } });
        // }
        // if (newPos && newPos !== -1) {
        //   updateListPosByListId(draggedId, newPos);
        //   // handleUpdateListPos(draggedId, newPos);
        // }
        updateListsOrder(id, draggedId);
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      differenceOffset: monitor.getDifferenceFromInitialOffset(),
    }),
  });

  const [{ isDragging }, connectDrag] = useDrag<
    TDraggableElement,
    unknown,
    { isDragging: boolean}
  >({
    type: 'list',
    item: { id, name},
    end(_, monitor) {
      console.log(monitor.didDrop(), id, )
      if (monitor.didDrop()){
        updateListPosByListId(id)
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      item: monitor.getItem(),
    }),
  });
  // mui spacing = 8; list width = spacing(34) = 272
  // const threshold: number = 272 * 0.5;

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

  // useEffect(() => {
  //   preview(getEmptyImage(), { captureDraggingState: true });
  // }, [preview]);

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
      {isOver && !isDragging ? dropGuide : children}
    </Box>
  );
};

export default BoardListDndContainer;
