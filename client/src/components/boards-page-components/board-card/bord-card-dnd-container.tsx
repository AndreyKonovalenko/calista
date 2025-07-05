import React, { useRef } from 'react';
import { useLocation, Link as RouterLink } from 'react-router';
import { Box, Link, ListItem } from '@mui/material';
import { useDrop, useDrag } from 'react-dnd';
import { TDraggableElement } from '../../../utils/types';
import { useReNumCardsPosInBoard } from '../../../api/lists-api-queries';
import { useUpdateCard } from '../../../api/cards-api-queries';
import {
  useSortedCardsByListId,
  useCards,
  useCardActions,
  useCardCalculatedPos,
} from '../../../services/card-store';
import { calculateNewPosByTargetPart } from '../../../utils/utils';

const styles = {
  link: {
    width: '100%',
  },
  previewStyle: {
    filter: 'brightness(0)',
    opacity: 0.2,
    borderRadius: 'inherit',
  },
};

const BoardCardDndContainer = (props: {
  _id: string;
  listId: string;
  children: React.ReactNode;
  pos: number;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const { _id, children, pos, listId } = props;
  const reNumCardsPosInBoard = useReNumCardsPosInBoard();
  const { moveCard, setCardCalculatedPos } = useCardActions();
  const cards = useCards();
  const sortedCardsByListId = useSortedCardsByListId(listId);
  const cardCalculatedPod = useCardCalculatedPos();
  const location = useLocation();

  const updateCardQuery = useUpdateCard();
  const handleUpdateCardPos = (
    cardId: string,
    newPos: number,
    newListId: string,
  ) => {
    updateCardQuery.mutate({
      id: cardId,
      data: { pos: newPos, listId: newListId },
    });
  };

  const [{ isOver }, connectDrop] = useDrop<
    TDraggableElement & { listId: string },
    unknown,
    {
      isOver: boolean;
    }
  >({
    accept: ['card'],
    hover({ _id: draggedId }, monitor) {
      if (!ref.current || draggedId === _id || !cards || !sortedCardsByListId) {
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
      const newPos = calculateNewPosByTargetPart(
        cards,
        sortedCardsByListId,
        _id,
        targetPart,
      );
      if (newPos && newPos !== -1) {
        setCardCalculatedPos(newPos);
        moveCard(draggedId, listId, newPos);
      }
    },
    drop({ _id: draggedId }) {
      if (cardCalculatedPod === -1) {
        reNumCardsPosInBoard.mutate({
          id: _id,
          data: { action: 'renumbering' },
        });
      }
      if (cardCalculatedPod && cardCalculatedPod > 0) {
        handleUpdateCardPos(draggedId, cardCalculatedPod, listId);
      }
      setCardCalculatedPos(null);
    },
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true }),
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
        sx={styles.link}
        ref={ref}
        to={`cards/${_id}`}
        component={RouterLink}
        state={{ background: location }}
        underline="none"
      >
        {isOver && !isDragging ? (
          <Box sx={styles.previewStyle}>{children}</Box>
        ) : (
          children
        )}
      </Link>
    </ListItem>
  );
};

export default BoardCardDndContainer;
