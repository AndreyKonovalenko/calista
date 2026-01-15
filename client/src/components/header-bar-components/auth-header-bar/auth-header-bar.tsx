import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';

const styles = {
  appBar: {
    borderBottom: '1px solid', 
    borderColor:'divider'
  }
}

const AuthHeaderBar = () => {
  return (
      <AppBar position="fixed" color="transparent" elevation={0} sx={styles.appBar}>
        <Toolbar> 
            <Typography
              variant="h6"
              color="primary"
            >
              Doski
            </Typography>
        </Toolbar>
      </AppBar>      
  );
}
export default AuthHeaderBar;