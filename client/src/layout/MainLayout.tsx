// import React, { useRef } from 'react';
import React from 'react';
import { Outlet } from 'react-router';
import { Box } from '@mui/material';
import HeaderBar from '../components/header-bar/header-bar';
import { HEADER } from './config-layout';
// import { TDraggableElement } from '../components/boards-page-components/board-list/board-list-draggable';
// import { useDrop } from 'react-dnd';

const MainLayout = (): JSX.Element => {
  // const [, connectDrop] = useDrop<TDraggableElement, unknown>({
  //   accept: 'list',
  // });
  // const ref = useRef<HTMLDivElement>(null);
  // connectDrop(ref);
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        overflow: 'hidden',
        outline: 'none',
      }}
      // ref={ref}
    >
      <HeaderBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: `calc(100vh - ${HEADER.H_DESKTOP}px)`,
          mt: `${HEADER.H_DESKTOP}px`,
          overflowY: 'hidden',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;

// <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
