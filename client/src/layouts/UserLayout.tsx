// import React, { useRef } from 'react';
import React from 'react';
import { Outlet } from 'react-router';
import { Box, IconButton } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// import { TDraggableElement } from '../components/boards-page-components/board-list/board-list-draggable';
// import { useDrop } from 'react-dnd';
import { TO_MAIN } from '../utils/route-constants';

const styles = {
  closeButton: {
    position: 'absolute',
    p: 2,
    top: 10,
    right: 10,
  },

  main: {
    width: '100%',
    minHeight: '100hv',
    overflowY: 'hidden',
  },
};

const UserLayout = (): JSX.Element => {
  return (
    <Box component="main" sx={styles.main}>
      <IconButton size="medium" href={TO_MAIN} sx={styles.closeButton}>
        <CloseOutlinedIcon />
      </IconButton>
      <Outlet />
    </Box>
  );
};

export default UserLayout;

// <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
