import React, { memo } from 'react';
import { Box } from '@mui/material';
import { useDragLayer, XYCoord } from 'react-dnd';
import BoardListPreview from './board-list-preview';

const getItemStyles = (currentOffset: XYCoord | null) => {
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }
  return {
    transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
    WebkitTransform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
  };
};

const BoardListCustomDragLayer = memo(function BaoardList(props: {
  id: string;
}) {
  const { id } = props;

  const { isDragging, item, currentOffset } = useDragLayer(monitor => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    initialOffest: monitor.getInitialSourceClientOffset(),
  }));

  if (!isDragging || id !== item.id) {
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
      <Box sx={getItemStyles(currentOffset)}>
        <BoardListPreview item={item} />
      </Box>
    </Box>
  );
});

export default BoardListCustomDragLayer;
