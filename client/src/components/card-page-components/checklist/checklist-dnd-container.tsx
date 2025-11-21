import React, { useRef } from 'react';
import { Grid } from '@mui/material';
import { useChecklistItemActions } from '../../../services/checklist-item-store';
import { useDrop } from 'react-dnd';
import { Identifier } from 'dnd-core';
import { TDraggableElement } from '../../../utils/types';
import { useChecklistItemsCalclulatedPos } from '../../../services/checklist-item-store';

const ChecklistDndContainer = (props: {
  children: React.ReactNode;
  _id: string;
  hasChecklistItems: boolean;
  isLast: string;
}) => {
  const { _id, children, hasChecklistItems, isLast } = props;
  const { moveChecklistIetem, setChecklistItemCalculatedPos } =
    useChecklistItemActions();
  const checklistItemCalculatedPos = useChecklistItemsCalclulatedPos();
  const ref = useRef<HTMLDivElement>(null);

  const [{ itemType }, connectDrop] = useDrop<
    TDraggableElement,
    unknown,
    {
      isOver: boolean;
      itemType: Identifier | null;
    }
  >(
    {
      accept: ['checklistItem'],
      hover({ _id: draggedId }, monitor) {
        const itemType = monitor.getItemType();
        if (!ref.current) {
          return;
        }
        if (itemType === 'checklistItem' && !hasChecklistItems) {
          moveChecklistIetem(draggedId, _id, 16384);
          setChecklistItemCalculatedPos(16384);
        }
      },
      drop({ _id: draggedId }) {
        if (itemType === 'checklistItem') {
          return {
            checklistId: _id,
            draggedId: draggedId,
            dropped: true,
            targetType: 'checklist',
            checklistItemCalculatedPos: checklistItemCalculatedPos,
          };
        }
      },
    },
    [_id, checklistItemCalculatedPos],
  );

  connectDrop(ref);
  return (
    <Grid container ref={ref} size={18} columns={18} id={isLast} rowSpacing={1}>
      {children}
    </Grid>
  );
};

export default ChecklistDndContainer;
