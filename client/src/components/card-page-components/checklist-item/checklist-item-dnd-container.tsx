import React, { memo, useMemo, useRef } from 'react';
import { Box } from '@mui/material';
import { TDraggableElement } from '../../../utils/types';
import { useDrop, useDrag } from 'react-dnd';
import { useReNumChecklistItemsPosInChecklist } from '../../../api/checklists-api-queries';
import { useUpdateChecklistItem } from '../../../api/checklist-items-api-queries';
import {
  useChecklistItemActions,
  useSortedChecklistItemsKeys,
  useChecklistItems,
  useChecklistItemsCalculatedPos,
} from '../../../services/checklist-item-store';
import { calculateNewPosByTargetPart } from '../../../utils/utils';

export type TDropChecklistItemResult = {
  dropped: boolean;
  checklistId: string;
  checklistItemCalculatedPos: number | null;
} | null;

const styles = {
  previewStyle: {
    filter: 'brightness(0)',
    opacity: 0.2,
  },
};

const ChecklistItemDndContainer = memo(
  function ChecklistItemDndContainer(props: {
    children: React.ReactNode;
    _id: string;
    checklistId: string;
  }) {
    const ref = useRef<HTMLDivElement>(null);
    const { children, _id, checklistId } = props;
    const reNumChecklistItemInChecklist =
      useReNumChecklistItemsPosInChecklist();
    const { moveChecklistItem, setChecklistItemCalculatedPos } =
      useChecklistItemActions();
    const updateChecklistItemQuery = useUpdateChecklistItem();
    const sortedChecklistItemsByChecklistId =
      useSortedChecklistItemsKeys(checklistId);
    const checklistItemCalculatedPos = useChecklistItemsCalculatedPos();
    const checklistItems = useChecklistItems();

    const handleUpdateChecklistItemPos = (
      checklistItemId: string,
      newPos: number,
      newChecklistId: string,
    ) => {
      updateChecklistItemQuery.mutate({
        id: checklistItemId,
        data: { pos: newPos, checklistId: newChecklistId },
      });
    };

    const [{ isOver }, connectDrop] = useDrop<
      TDraggableElement,
      unknown,
      { isOver: boolean }
    >(
      {
        accept: ['checklistItem'],
        hover({ _id: draggedId }, monitor) {
          if (
            !ref.current ||
            draggedId === _id ||
            !checklistItems ||
            !sortedChecklistItemsByChecklistId
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
            checklistItems,
            sortedChecklistItemsByChecklistId,
            _id,
            targetPart,
          );
          setChecklistItemCalculatedPos(newPos);
          if (newPos !== -1) {
            moveChecklistItem(draggedId, checklistId, newPos);
          }
        },
        drop({ _id: draggedId }) {
          return {
            checklistId: checklistId,
            draggedId: draggedId,
            dropped: true,
            targetType: 'checklistItem',
            checklistItemCalculatedPos: checklistItemCalculatedPos,
          };
        },
        collect: monitor => ({
          isOver: monitor.isOver({ shallow: true }),
        }),
      },
      [_id, children, checklistId, checklistItemCalculatedPos],
    );

    const [{ isDragging }, connectDrag] = useDrag<
      TDraggableElement & { checklistId: string },
      unknown,
      { isDragging: boolean }
    >(
      {
        type: 'checklistItem',
        item: { _id, checklistId },
        end({ _id: draggedId }, monitor) {
          if (monitor.didDrop()) {
            const dropResult: TDropChecklistItemResult =
              monitor.getDropResult();
            if (dropResult && dropResult.dropped) {
              if (dropResult.checklistItemCalculatedPos === -1) {
                reNumChecklistItemInChecklist.mutate({
                  id: dropResult.checklistId,
                  data: { action: 'renumbering' },
                });
              }
              if (
                dropResult.checklistItemCalculatedPos &&
                dropResult.checklistItemCalculatedPos > 0
              ) {
                handleUpdateChecklistItemPos(
                  draggedId,
                  dropResult.checklistItemCalculatedPos,
                  dropResult.checklistId,
                );
              }
              setChecklistItemCalculatedPos(null);
            }
          }
        },
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
      },
      [checklistItemCalculatedPos],
    );
    const dragStyle = useMemo(
      () => ({
        width: '100%',
        opocity: isDragging ? 0.3 : 1,
        backgroundColor: isDragging ? 'listBackground.main' : null,
        borderRadius: isDragging ? 2 : null,
        transform: 'translate(0, 0)',
        pl: isDragging ? 2 : 0,
        pr: isDragging ? 2 : 0,
      }),
      [isDragging],
    );
    connectDrag(ref);
    connectDrop(ref);

    return (
      <Box sx={dragStyle} ref={ref}>
        {isOver && !isDragging ? (
          <Box sx={styles.previewStyle}>{children}</Box>
        ) : (
          children
        )}
      </Box>
    );
  },
);

export default ChecklistItemDndContainer;
