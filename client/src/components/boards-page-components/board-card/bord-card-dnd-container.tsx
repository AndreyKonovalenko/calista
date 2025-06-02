import React, { useRef } from 'react';
import { useLocation, Link as RouterLink } from 'react-router';
import { Box, Link, ListItem } from '@mui/material';
import { useDrop, useDrag } from 'react-dnd';
import { TDraggableElement } from '../../../utils/types';
import { calculateNewPosition } from '../../../utils/utils';
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
  const { calculatedPos, setCalculatedPos, lists, updateCardPosByCardId } = useBoardStore(
    state => state,
  );

  const [{ isOver }, connectDrop] = useDrop<
    TDraggableElement & { listId: string },
    unknown,
    {
      isOver: boolean;
    }
  >({
    accept: ['card'],
    hover({ _id: draggedId, listId: draggedIdListId }) {
      if (draggedId !== _id) {
        console.log(listId, draggedIdListId);
        if (listId === draggedIdListId) {
          const dropList = lists.find(element => element._id === listId);
          if (dropList) {
            const newPos = calculateNewPosition(dropList.cards, draggedId, _id);
            setCalculatedPos(newPos)
            if (newPos && newPos !== -1){
                updateCardPosByCardId(listId, draggedId, newPos)
            }
          }
        }
        // const newPos = calculateN
        // newPosition(cards, _id, draggedId);
        // // setCalculatedListPos(newPos);
        // if (newPos && newPos !== -1) {
        //   // updateListPosByListId(draggedId, newPos);
        // }
      }
    },
    drop({ _id: draggedId }) {
      console.log('did drop', calculatedPos, draggedId);
      // if (calculatedListPos === -1) {
      //   updateBoardById.mutate({ id: _id, data: { action: 'renumbering' } });
      // }
      if (calculatedPos != undefined && calculatedPos > 0) {
        //   handleUpdateListPos(draggedId, calculatedListPos);
      }
      setCalculatedPos(undefined);
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
