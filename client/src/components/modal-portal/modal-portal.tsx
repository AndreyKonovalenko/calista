import React from 'react';
import { Box, useTheme} from '@mui/material';


const ModalPortal = (props: {
  children: React.ReactNode;
}) => {
  const { children } = props;
  const {spacing} = useTheme()
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
    top: spacing(14),
    left: '50%',
    transform: 'translate(-50%, -50%)',
    opacity: 1,
    zIndex: 9999,
  };

  return (
    <React.Fragment>
      <Box sx={container}>
        {children}
      </Box>
      <Box sx={overlay} />
    </React.Fragment>
  );
};

export default ModalPortal;
