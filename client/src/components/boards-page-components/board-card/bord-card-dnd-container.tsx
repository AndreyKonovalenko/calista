import React, { useRef } from 'react';
import { useLocation, Link } from 'react-router';
import { Box } from '@mui/material';
import { useDrop, useDrag } from 'react-dnd';
import { TDraggableElement } from '../../../utils/types';
// import { calculateNewPosition } from '../../../utils/utils';
import { useBoardStore } from '../../../services/boards/board-store';

const BoardCardDndContainer = (props: {
  _id: string;
  children: React.ReactNode;
  pos: number;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const { _id, children, pos } = props;
  const location = useLocation();
  const { calculatedListPos, setCalculatedListPos } = useBoardStore(
    state => state,
  );

  const [{ isOver }, connectDrop] = useDrop<
    TDraggableElement,
    unknown,
    {
      isOver: boolean;
    }
  >({
    accept: ['card'],
    hover({ _id: draggedId }, monitor) {
      const itemType = monitor.getItemType();
      console.log(itemType);
      if (itemType === 'card') {
        if (draggedId !== _id) {
          // const newPos = calculateNewPosition(cards, _id, draggedId);
          // // setCalculatedListPos(newPos);
          // if (newPos && newPos !== -1) {
          //   // updateListPosByListId(draggedId, newPos);
          // }
        }
      }
    },
    drop({ _id: draggedId }) {
      console.log('did drop', calculatedListPos, draggedId);
      // if (calculatedListPos === -1) {
      //   updateBoardById.mutate({ id: _id, data: { action: 'renumbering' } });
      // }
      if (calculatedListPos != undefined && calculatedListPos > 0) {
        //   handleUpdateListPos(draggedId, calculatedListPos);
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
    type: 'card',
    item: { _id, pos },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  connectDrag(ref);
  connectDrop(ref);

  return (
    <Link to={`cards/${_id}`} ref={ref} state={{ background: location }}>
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
    </Link>
  );
};

export default BoardCardDndContainer;
