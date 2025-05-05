import React, { useRef, memo, useEffect } from 'react';
import { Box } from '@mui/material';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

export type TDraggableElement = {
  id: string;
  name: string;
};

const BoardListDraggable = memo(function BoardListDraggable(props: {
  id: string;
  name: string;
  children: React.ReactNode;
}) {
  const { id, children, name } = props;
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, connectDrag, preview] = useDrag<
    TDraggableElement,
    unknown,
    { isDragging: boolean }
  >({
    type: 'list',
    item: { id, name },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.3 : 1;
  connectDrag(ref);

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <Box ref={ref} sx={{ opacity: opacity }}>
      {children}
    </Box>
  );
});

export default BoardListDraggable;
