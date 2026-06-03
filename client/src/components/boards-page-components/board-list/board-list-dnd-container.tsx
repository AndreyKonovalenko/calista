import React, { memo, useRef, useMemo } from 'react';
import { Box } from '@mui/material';
import { useDrop, useDrag } from 'react-dnd';
import { Identifier } from 'dnd-core';
import { useUpdateList } from '../../../api/lists-api-queries';
import { useReNumListsPosInBoard } from '../../../api/boards-api-queries';
import { TDraggableElement } from '../../../utils/types';
import {
  useListActions,
  useListCalculatedPos,
  useLists,
  useSortedLists,
} from '../../../services/list-store';
import { calculateNewPosByTargetPart } from '../../../utils/utils';
import {
  useCardActions,
  useCardCalculatedPos,
} from '../../../services/card-store';

const previewStyle = {
  filter: 'brightness(0)',
  opacity: 0.2,
  borderRadius: 'inherit',
};

const BoardListDndContainer = memo(function BoradListDndContainer(
  props: { _id: string; name: string; pos: number } & {
    children: React.ReactNode;
  } & { hasCards: boolean },
) {
  const { _id, children, name, hasCards } = props;
  const { updateListPosByListId, setListCulclulatedPos } = useListActions();
  const { moveCard, setCardCalculatedPos } = useCardActions();
  const lists = useLists();
  const sortedLists = useSortedLists();
  const calculatedPos = useListCalculatedPos();
  const cardCalculatedPos = useCardCalculatedPos();
  const ref = useRef<HTMLDivElement>(null);
  const updateListQuery = useUpdateList();
  const reNumListsPosInBoard = useReNumListsPosInBoard();

  const handleUpdateListPos = (listId: string, newPos: number | null) => {
    updateListQuery.mutate({
      id: listId,
      data: { pos: newPos },
    });
  };

  const [{ isOver, itemType }, connectDrop] = useDrop<
    TDraggableElement & { listId: string },
    unknown,
    {
      isOver: boolean;
      itemType: Identifier | null;
    }
  >(
    {
      accept: ['list', 'card'],
      hover({ _id: draggedId }, monitor) {
        const itemType = monitor.getItemType();
        if (!ref.current || draggedId === _id || !lists || !sortedLists) {
          return;
        }
        if (itemType === 'list') {
          // Determine rectangle on screen
          const hoverBoundingRect = ref.current.getBoundingClientRect();
          // Get vertical middle
          const hoverMiddleX =
            (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
          const diff =
            (hoverBoundingRect.right - hoverBoundingRect.left) * 0.25;
          // Determine mouse position
          const clientOffset = monitor.getClientOffset();
          // Get pixels to the top
          if (!clientOffset) {
            return;
          }
          const hoverClientX = clientOffset.x - hoverBoundingRect.left;
          // if the client gets into a segment of 25% form hoverMiddle, then newPos calculation starts
          // if not, renders grey element preview
          const targetPart =
            hoverClientX < hoverMiddleX + diff && hoverClientX > hoverMiddleX
              ? 'before'
              : hoverClientX > hoverMiddleX - diff &&
                  hoverClientX < hoverMiddleX
                ? 'after'
                : undefined;

          if (targetPart === 'before' || targetPart === 'after') {
            const newPos = calculateNewPosByTargetPart(
              lists,
              sortedLists,
              _id,
              targetPart,
            );
            if (newPos && newPos !== 1) {
              setListCulclulatedPos(newPos);
              updateListPosByListId(draggedId, newPos);
            }
          }
        }
        if (itemType === 'card' && !hasCards) {
          moveCard(draggedId, _id, 16384);
          setCardCalculatedPos(16384);
        }
      },
      drop({ _id: draggedId }) {
        if (itemType === 'list') {
          setListCulclulatedPos(null);
        }
        if (itemType === 'list') {
          return {
            draggedId: _id,
            dropped: true,
            calculatedPos: calculatedPos,
          };
        }
        if (itemType === 'card') {
          return {
            listId: _id,
            draggedId: draggedId,
            dropped: true,
            targetType: 'list',
            cardCalculatedPos: cardCalculatedPos,
          };
        }
      },
      collect: monitor => ({
        isOver: monitor.isOver({ shallow: true }),
        itemType: monitor.getItemType(),
      }),
    },
    [_id, sortedLists, lists, calculateNewPosByTargetPart, hasCards],
  );

  const [{ isDragging }, connectDrag] = useDrag<
    TDraggableElement,
    unknown,
    { isDragging: boolean }
  >(
    {
      type: 'list',
      item: { _id, name },
      end({ _id: draggedId }, monitor) {
        if (monitor.didDrop()) {
          const dropResult: {
            draggedId: string;
            dropped: boolean;
            calculatedPos: number;
          } | null = monitor.getDropResult();
          if (dropResult && dropResult.dropped) {
            if (dropResult.calculatedPos === -1) {
              reNumListsPosInBoard.mutate({ action: 'renumbering' });
            }
            if (dropResult.calculatedPos && dropResult.calculatedPos > 0) {
              handleUpdateListPos(draggedId, dropResult.calculatedPos);
            }
            setListCulclulatedPos(null);
          }
        }
      },
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
      }),
    },
    [_id],
  );

  const dragStyle = useMemo(
    () => ({
      borderRadius: 'inherit',
      height: '100%',
      width: 272,
      opacity: isDragging ? 0.3 : 1,
    }),
    [isDragging],
  );

  connectDrag(ref);
  connectDrop(ref);

  return (
    <Box sx={dragStyle} ref={ref}>
      {isOver && itemType === 'list' && !isDragging ? (
        <Box sx={previewStyle}>{children}</Box>
      ) : (
        children
      )}
    </Box>
  );
});

export default BoardListDndContainer;
