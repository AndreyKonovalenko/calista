import React, { memo, useRef } from 'react';
import { Box } from '@mui/material';
import { TDraggableElement } from '../../../utils/types';
import { useDrop, useDrag } from 'react-dnd';

const ChecklistItemDndContainer = memo(
  function ChecklistItemDndContainer(props: { children: React.ReactNode, _id: string, checklistId: string }) {
    const { children } = props;
    const ref = useRef<HTMLDivElement>(null);
    const [{isOver}, connectDrop]= useDrop<
    TDraggableElement, unknown,{isOver:boolean}
    >({accept:['checklistItem'],
      hover({})
    })


    return <Box ref={ref}>{children}</Box>;
  },
);

export default ChecklistItemDndContainer;
