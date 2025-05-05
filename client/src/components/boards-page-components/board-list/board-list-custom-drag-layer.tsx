import React, { memo } from 'react';
import { Box } from '@mui/material';
import { useDragLayer, XYCoord } from 'react-dnd';
import BoardListPreview from './board-list-preview';

const getItemStyles = (clientOffset: XYCoord | null) => {
  if (!clientOffset) {
    return {
      display: 'none',
    };
  }
  return {
    transform: `translate(${clientOffset.x}px, ${clientOffset.y}px)`,
    WebkitTransform: `translate(${clientOffset.x}px, ${clientOffset.y}px)`,
  };
};

const BoardListCustomDragLayer = memo(function BaoardList() {
  const { isDragging, item, clientOffset } = useDragLayer(monitor => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    clientOffset: monitor.getClientOffset(),
  }));

  if (!isDragging) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '0',
        left: '0',
        pointerEvents: 'none',
        zIndex: 100,
      }}
    >
      <Box sx={getItemStyles(clientOffset)}>
        <BoardListPreview item={item} />
      </Box>
    </Box>
  );
});

export default BoardListCustomDragLayer;
