import React, { useRef } from 'react';
import { useLocation, Link as RouterLink } from 'react-router';
import { Box, Link, ListItem } from '@mui/material';
import { useDrop, useDrag } from 'react-dnd';
import { TDraggableElement } from '../../../utils/types';
// import { calculateNewPosition } from '../../../utils/utils';
import { calculateNewPosByTargetPart } from '../../../utils/utils';
import { useBoardStore } from '../../../services/boards/board-store';

const BoardCardDndContainer = (props: {
  _id: string;
  listId: string;
  children: React.ReactNode;
  pos: number;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const { _id, children, pos, listId } = props;
  const location = useLocation();
  const {
    calculatedPos,
    lists,
    setCalculatedPos,
    // updateCardPos,
    moveCardBetweenLists,
  } = useBoardStore(state => state);

  const [{ isOver }, connectDrop] = useDrop<
    TDraggableElement & { listId: string },
    unknown,
    {
      isOver: boolean;
    }
  >({
    accept: ['card'],
    // hover({ _id: draggedId, listId: draggedIdListId }) {
    hover({ _id: draggedId, listId: draggedIdListId }, monitor) {
      if (!ref.current || draggedId === _id) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      if (!clientOffset) {
        return;
      }
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      const targetPart = hoverClientY > hoverMiddleY ? 'bottom' : 'top';
      console.log(targetPart);
      const newPos = calculateNewPosByTargetPart(
        lists[listId].cards,
        _id,
        targetPart,
      );
      console.log(newPos);

      if (newPos && newPos !== -1) {
        moveCardBetweenLists(draggedId, listId, draggedIdListId, newPos);
      }

      // if (draggedId !== _id) {
      // const newPos = calculateNewPosition(
      //   lists[listId].cards,
      //   _id,
      //   draggedId,
      // );
      // setCalculatedPos(newPos);
      // if (newPos && newPos !== -1) {
      //   moveCardBetweenLists(draggedId, listId, draggedIdListId, newPos);
      // }

      // if (listId !== draggedIdListId) {
      //   // const newPos = calculateNewPosition(lists[listId].cards, _id, draggedId);
      //   // setCalculatedPos(newPos)
      //   // if (newPos && newPos !== -1){
      //   //     moveCardBetweenList( draggedId, listId, draggedIdListId)
      //   // }
      //   moveCardBetweenLists(draggedId, listId, draggedIdListId);
      // }

      // const newPos = calculateN
      // newPosition(cards, _id, draggedId);
      // // setCalculatedListPos(newPos);
      // if (newPos && newPos !== -1) {
      //   // updateListPosByListId(draggedId, newPos);
      // }
    },
    drop({ _id: draggedId }) {
      console.log('did drop', calculatedPos, draggedId);
      // if (calculatedListPos === -1) {
      //   updateBoardById.mutate({ id: _id, data: { action: 'renumbering' } });
      // }
      if (calculatedPos && calculatedPos > 0) {
        //   handleUpdateListPos(draggedId, calculatedListPos);
      }
      setCalculatedPos(null);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      differenceOffset: monitor.getDifferenceFromInitialOffset(),
    }),
  });

  const [{ isDragging }, connectDrag] = useDrag<
    TDraggableElement & { listId: string },
    unknown,
    { isDragging: boolean }
  >({
    type: 'card',
    item: { _id, pos, listId },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  connectDrag(ref);
  connectDrop(ref);
  // useEffect(()=>{
  //   console.log(isDragging, isOver)
  // })

  return (
    <ListItem>
      <Link
        sx={{ width: '100%' }}
        ref={ref}
        to={`cards/${_id}`}
        component={RouterLink}
        state={{ background: location }}
        underline="none"
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
      </Link>
    </ListItem>
  );
};

export default BoardCardDndContainer;
