import React from 'react';
import { Box, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ModalPortal = (props: { children: React.ReactNode, onModalClose: () => void }) => {
  const { children, onModalClose } = props;
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
    opacity: 1,
    zIndex: 9999,
  };

  return (
    <React.Fragment>
      <Box sx={container}>
        <Paper>     
          <Box onClick={onModalClose} sx={{display: 'flex', flexDirection: 'row', justifyContent:'flex-end', cursor: "pointer"}}>
            <CloseIcon fontSize="large"/>
          </Box>
        {children}
          </Paper>
      </Box>
     <Box sx={overlay}/>
  </React.Fragment>
  )
}

export default ModalPortal;
