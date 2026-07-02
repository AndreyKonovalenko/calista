import React, { useRef, useMemo, useCallback } from 'react';
import { useLocation, Link as RouterLink, useParams } from 'react-router';
import { Box, Link, ListItem } from '@mui/material';
import { useDrop, useDrag, DropTargetMonitor } from 'react-dnd';
import { TDraggableElement } from '../../../utils/types';
import { useReNumCardsPosInList } from '../../../api/lists-api-queries';
import { useUpdateCard } from '../../../api/cards-api-queries';
import { debugLog } from '../../../utils/debug';
import {
  useSortedCardsByListId,
  useCards,
  useCardActions,
  useCardCalculatedPos,
} from '../../../services/card-store';
import { calculateNewPosByTargetPart } from '../../../utils/utils';
import { ROUTES } from '../../../utils/router-paths';
const IVALID_POS = -1;

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
}): React.ReactElement | null => {
  const ref = useRef<HTMLAnchorElement>(null);
  const { boardId } = useParams();
  const { _id, children, listId } = props;

  const reNumCardsPosInList = useReNumCardsPosInList();
  const { moveCard, setCardCalculatedPos } = useCardActions();
  const cards = useCards();
  const sortedCardsByListId = useSortedCardsByListId(listId);
  const cardCalculatedPos = useCardCalculatedPos();
  const location = useLocation();
  const updateCardQuery = useUpdateCard();

  const handleUpdateCardPos = useCallback(
    (cardId: string, newPos: number, newListId: string) => {
      updateCardQuery.mutate({
        id: cardId,
        data: { pos: newPos, listId: newListId },
      });
    },
    [updateCardQuery],
  );

  const handleHover = useCallback(
    (
      { _id: draggedId }: { _id: string },
      monitor: DropTargetMonitor<
        TDraggableElement & { listId: string },
        unknown
      >,
    ) => {
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
      const targetPart = hoverClientY > hoverMiddleY ? 'after' : 'before';
      const newPos = calculateNewPosByTargetPart(
        cards,
        sortedCardsByListId,
        _id,
        targetPart,
      );
      setCardCalculatedPos(newPos);
      if (newPos !== IVALID_POS) {
        moveCard(draggedId, listId, newPos);
      }
    },
    [
      _id,
      listId,
      cardCalculatedPos,
      cards,
      sortedCardsByListId,
      moveCard,
      setCardCalculatedPos,
    ],
  );

  const [{ isOver }, connectDrop] = useDrop<
    TDraggableElement & { listId: string },
    unknown,
    {
      isOver: boolean;
    }
  >(
    {
      accept: ['card'],
      hover: handleHover,
      drop({ _id: draggedId }) {
        return {
          listId: listId,
          draggedId: draggedId,
          dropped: true,
          targetType: 'card',
          cardCalculatedPos: cardCalculatedPos,
        };
      },
      collect: monitor => ({
        isOver: monitor.isOver({ shallow: true }),
      }),
    },
    [_id, children, listId, cardCalculatedPos, handleHover],
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

  if (!boardId) {
    debugLog('board-card-dnd-container', { boardId, massage: 'no boaridId' });
    return null;
  }

  const cardPath = ROUTES.card(boardId, listId, _id);

  return (
    <ListItem>
      <Link
        sx={dragStyle}
        ref={ref}
        to={cardPath}
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
