import React from 'react';
import { Box } from '@mui/material';
const overlay = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  background: '#131316',
  top: 0,
  left: 0,
  opacity: 0.45,
  zIndex: 9998,
};

const modal = {
  position: 'fixed',
  height: '400px',
  width: '1000px',
  maxWidth: '100%',
  maxHeight: '100%',
  top: '28.5%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  opacity: 1,
  zIndex: 9999,
};

const ModalPortal = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return (
    <React.Fragment>
      <Box sx={modal}>{children}</Box>
      <Box sx={overlay} />
    </React.Fragment>
  );
};

export default ModalPortal;
