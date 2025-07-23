import React from 'react';
import { Box } from '@mui/material';

const ModalPortal = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const overlay = {
    width: '100%',
    background: '#131316',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    opacity: 0.45,
    zIndex: 9998,
  };

  const container = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    mt: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
    zIndex: 9999,
  };

  return (
    <React.Fragment>
      <Box sx={container}>{children}</Box>
      <Box sx={overlay} />
    </React.Fragment>
  );
};

export default ModalPortal;
