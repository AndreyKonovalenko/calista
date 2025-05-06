import React from 'react';
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

const BoardListCustomDragLayer = () =>  {
  const { itemType, isDragging, item, clientOffset } = useDragLayer(monitor => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    clientOffset: monitor.getClientOffset(),
  }));
  
  function renderItem() {
    switch(itemType) {
      case "list": 
        return  <BoardListPreview item={item} />
      default: 
      return null
    }
  }

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
        {renderItem()}
      </Box>
    </Box>
  );
};

export default BoardListCustomDragLayer;
