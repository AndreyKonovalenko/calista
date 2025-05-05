import React, { useRef, memo, useEffect } from 'react';
import { Box } from '@mui/material';
import { useDrag } from 'react-dnd';


import { getEmptyImage } from 'react-dnd-html5-backend';

const BoardListDraggable = memo(function BoardListDraggable(props: {
  id: string;
  children: React.ReactNode;
}) {
  const { id, children  } = props;
  const ref = useRef<HTMLDivElement>(null);
  type TMovableEelement = {
    id: string;
  };

  const [{ isDragging }, connectDrag, preview] = useDrag<
    TMovableEelement,
    unknown,
    { isDragging: boolean }
  >({
    type: 'list',
    item: {id},
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
    <Box
      ref={ref}
      sx={{opacity: opacity }}
    >
    {children}
   </Box>)
})


export default BoardListDraggable;
