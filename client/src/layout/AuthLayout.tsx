import React from 'react';
import { Outlet } from 'react-router';
import { Box } from '@mui/material';
import HeaderBar from '../components/header-bar/header-bar';
import { HEADER } from './config-layout';

const styles = {
  contanier: {
    display: 'flex',
    width: '100%',
    overflow: 'hidden',
    outline: 'none',
  },
  main: {
    flexGrow: 1,
    minHeight: `calc(100vh - ${HEADER.H_DESKTOP}px)`,
    mt: `${HEADER.H_DESKTOP}px`,
    overflowY: 'hidden',
  },
};

const AuthLayout = (): JSX.Element => {
  return (
    <Box sx={styles.contanier}>
      <HeaderBar />
      <Box sx={styles.main}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AuthLayout;
