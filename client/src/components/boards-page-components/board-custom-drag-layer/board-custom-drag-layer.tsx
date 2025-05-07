import React from 'react';
import { Box } from '@mui/material';
import { useDragLayer, XYCoord } from 'react-dnd';
import BoardListPreview from '../board-list/board-list-preview';

const getItemStyles = (
  clientOffset: XYCoord | null,
  currentOffset: XYCoord | null,
) => {
  if (!clientOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }
  const { x } = clientOffset;
  const { y } = currentOffset;
  return {
    transform: `translate(${x}px, ${y}px)`,
    WebkitTransform: `translate(${x}px, ${y}px)`,
  };
};

const BoardCustomDragLayer = () => {
  const { itemType, isDragging, item, clientOffset, currentOffset } =
    useDragLayer(monitor => ({
      isDragging: monitor.isDragging(),
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      clientOffset: monitor.getClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
    }));

  function renderItem() {
    switch (itemType) {
      case 'list':
        return <BoardListPreview item={item} />;
      default:
        return null;
    }
  }

  if (!isDragging) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        pointerEvents: 'none',
        top: '0',
        left: '0',
        zIndex: 9999,
        width: '100%',
        height: '100%',
      }}
    >
      <Box sx={getItemStyles(clientOffset, currentOffset)}>{renderItem()}</Box>
    </Box>
  );
};

export default BoardCustomDragLayer;
