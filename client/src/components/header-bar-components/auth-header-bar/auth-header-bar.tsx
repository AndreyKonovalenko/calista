import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { TO_MAIN } from '../../../utils/route-constants';
import { Link as RouterLink } from 'react-router';
import Link from '@mui/material/Link';

const styles = {
  appBar: {
    borderBottom: '1px solid',
    borderColor: 'divider',
  },
  toolbar: {
    despley: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
  },
};

const AuthHeaderBar = () => {
  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={styles.appBar}
    >
      <Toolbar sx={styles.toolbar}>
        <Link
          component={RouterLink}
          variant="h6"
          underline="none"
          to={TO_MAIN}
          color="primary.main"
        >
          Doski
        </Link>
      </Toolbar>
    </AppBar>
  );
};
export default AuthHeaderBar;
