import React from 'react';
import { Box, Typography } from '@mui/material';

const ModalPortal = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    width: '640px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    margin: 'auto',
    background: '#1c1c21',
    zIndex: 99,
    borderRadius: '40px'
    }
  
  return (
    <Box sx={containerStyles}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Text in a modal
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </Typography>
      {children}
    </Box>

  );
};

export default ModalPortal;
