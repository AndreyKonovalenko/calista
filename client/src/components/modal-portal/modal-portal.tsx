import React from 'react';
import { Box } from '@mui/material';

const ModalPortal = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const overlay = {
    width: '100%',
    background: '#131316',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.45,
    zIndex: 9998,
  };
  const container = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: '50%',
    left: '50%',
    margin: 'auto',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999,
  };

  return (
    <Box sx={overlay}>
      <Box sx={container}>{children}</Box>
    </Box>
  );
};

export default ModalPortal;
