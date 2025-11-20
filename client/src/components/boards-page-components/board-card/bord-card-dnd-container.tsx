import React, { useRef, useMemo } from 'react';
import { useLocation, Link as RouterLink } from 'react-router';
import { Box, Link, ListItem } from '@mui/material';
import { useDrop, useDrag } from 'react-dnd';
import { TDraggableElement } from '../../../utils/types';
import { useReNumCardsPosInList } from '../../../api/lists-api-queries';
import { useUpdateCard } from '../../../api/cards-api-queries';
import {
  useSortedCardsByListId,
  useCards,
  useCardActions,
  useCardCalculatedPos,
} from '../../../services/card-store';
import { calculateNewPosByTargetPart } from '../../../utils/utils';

export type TDropCardResult = {
  dropped: boolean;
  listId: string;
  cardCalculatedPos: number | null;
} | null;

const styles = {
  previewStyle: {
    filter: 'brightness(0)',
    opacity: 0.2,
  },
  border: {
    borderStyle: 'solid',
    borderWidth: 'thick',
    borderRadius: 2,
    borderColor: 'primary.main',
  },
};

const BoardCardDndContainer = (props: {
  _id: string;
  listId: string;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const { _id, children, listId } = props;
  const reNumCardsPosInList = useReNumCardsPosInList();
  const { moveCard, setCardCalculatedPos } = useCardActions();
  const cards = useCards();
  const sortedCardsByListId = useSortedCardsByListId(listId);
  const cardCalculatedPos = useCardCalculatedPos();
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
  >(
    {
      accept: ['card'],
      hover({ _id: draggedId }, monitor) {
        if (
          !ref.current ||
          draggedId === _id ||
          !cards ||
          !sortedCardsByListId
        ) {
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
        setCardCalculatedPos(newPos);
        if (newPos !== -1) {
          moveCard(draggedId, listId, newPos);
        }
      },
      drop({ _id: draggedId }) {
        return {
          listId: listId,
          draggedId: draggedId,
          dropped: true,
          tragetType: 'card',
          cardCalculatedPos: cardCalculatedPos,
        };
      },
      collect: monitor => ({
        isOver: monitor.isOver({ shallow: true }),
      }),
    },
    [_id, children, listId, cardCalculatedPos],
  );

  const [{ isDragging }, connectDrag] = useDrag<
    TDraggableElement & { listId: string },
    unknown,
    { isDragging: boolean }
  >(
    {
      type: 'card',
      item: { _id, listId },
      end({ _id: draggedId }, monitor) {
        if (monitor.didDrop()) {
          const dropResult: TDropCardResult = monitor.getDropResult();
          if (dropResult && dropResult.dropped) {
            if (dropResult.cardCalculatedPos === -1) {
              reNumCardsPosInList.mutate({
                id: dropResult.listId,
                data: { action: 'renumbering' },
              });
            }
            if (
              dropResult.cardCalculatedPos &&
              dropResult.cardCalculatedPos > 0
            ) {
              handleUpdateCardPos(
                draggedId,
                dropResult.cardCalculatedPos,
                dropResult.listId,
              );
            }
            setCardCalculatedPos(null);
          }
        }
      },
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
      }),
    },
    [cardCalculatedPos],
  );

  const dragStyle = useMemo(
    () => ({
      width: '100%',
      opacity: isDragging ? 0.3 : 1,
      p: 0,
      transform: 'translate(0, 0)',
    }),
    [isDragging],
  );
  connectDrag(ref);
  connectDrop(ref);

  return (
    <ListItem>
      <Link
        sx={dragStyle}
        ref={ref}
        to={`lists/${listId}/cards/${_id}`}
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
