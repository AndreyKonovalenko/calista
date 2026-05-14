// import React, { useRef } from 'react';
import React from 'react';
import { Outlet } from 'react-router';
import { Box, IconButton, Grid } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// import { TDraggableElement } from '../components/boards-page-components/board-list/board-list-draggable';
// import { useDrop } from 'react-dnd';
import { TO_MAIN } from '../utils/route-constants';
import UserPageSideBar from '../components/user-page-components/user-page-side-bar/user-page-side-bar';

const styles = {
  closeButton: {
    position: 'absolute',
    p: 2,
    top: 10,
    right: 10,
    zIndex: 999,
  },

  main: {
    width: '100%',
    minHeight: '100hv',
    overflowY: 'hidden',
  },

  container: {
    height: '100vh',
    flexShrink: 0,
  },
  menu: {
    minWidth: { xs: '100%', md: 256 },
    maxWidth: { xs: '100%', md: 256 },
    borderRight: { md: '1px solid', xs: 'none' },
    borderBottom: { md: 'none', xs: '1px solid' },
    borderColor: { md: 'divider', xs: 'divider' },
    minHeight: { xs: '20vh', md: '100vh' },
  },
  content: {
    p: 2,
    minHeight: { xs: '80vh', md: '100vh' },
  },
};

const UserLayout = (): JSX.Element => {
  return (
    <Box component="main" sx={styles.main}>
      <IconButton size="medium" href={TO_MAIN} sx={styles.closeButton}>
        <CloseOutlinedIcon />
      </IconButton>
      <Grid container size={12} sx={styles.container}>
        <Grid size={{ xs: 12, md: 2 }} sx={styles.menu}>
          <UserPageSideBar />
        </Grid>
        <Grid size={{ xs: 12, md: 'grow' }} sx={styles.content}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserLayout;

// <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
