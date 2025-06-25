import React, { useRef, useEffect } from 'react';
import { useLocation, Link as RouterLink } from 'react-router';
import { Box, Link, ListItem } from '@mui/material';
import { useDrop, useDrag } from 'react-dnd';
import { TDraggableElement } from '../../../utils/types';
// import { calculateNewPosByTargetPart } from '../../../utils/utils';
// import { useBoardStore } from '../../../services/boards/board-store';
// import { useReNumCardsPosInBoard } from '../../../api/lists-api-queries';
// import { useUpdateCard } from '../../../api/cards-api-queries';

const BoardCardDndContainer = (props: {
  _id: string;
  listId: string;
  children: React.ReactNode;
  pos: number;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  // const reNumCardsPosInBoard = useReNumCardsPosInBoard();
  const { _id, children, pos, listId } = props;
  const location = useLocation();
  // const { calculatedPos, lists, setCalculatedPos, moveCard } = useBoardStore(
  //   state => state,
  // );
  // const updateCardQuery = useUpdateCard();
  // const handleUpdateCardPos = (
  //   cardId: string,
  //   newPos: number,
  //   newListId: string,
  // ) => {
  //   updateCardQuery.mutate({
  //     id: cardId,
  //     data: { pos: newPos, listId: newListId },
  //   });
  // };

  const [{ isOver }, connectDrop] = useDrop<
    TDraggableElement & { listId: string },
    unknown,
    {
      isOver: boolean;
    }
  >({
    accept: ['card'],
    hover({ _id: draggedId }, monitor) {
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
      const targetPart = hoverClientY > hoverMiddleY ? 'before' : 'after';
      console.log(targetPart);
      // const newPos = calculateNewPosByTargetPart(
      //   lists[listId].cards,
      //   _id,
      //   targetPart,
      // );
      // setCalculatedPos(newPos);
      // if (newPos && newPos !== -1) {
      //   moveCard(draggedId, listId, newPos);
      // }
    },
    drop({ _id: draggedId }) {
      console.log(draggedId);
      // console.log(calculatedPos);
      // if (calculatedPos === -1) {
      //   reNumCardsPosInBoard.mutate({
      //     id: _id,
      //     data: { action: 'renumbering' },
      //   });
      // }
      // if (calculatedPos && calculatedPos > 0) {
      //   console.log(calculatedPos);
      //   handleUpdateCardPos(draggedId, calculatedPos, listId);
      // }
      // setCalculatedPos(null);
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
  useEffect(() => {
    console.log('Card rerenders', _id);
  }, [_id]);

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
