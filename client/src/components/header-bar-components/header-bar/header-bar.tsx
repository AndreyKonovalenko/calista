import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useMutation } from '@tanstack/react-query';
import AccountMenu from '../account-menu/account-menu';

import { Link as RouterLink } from 'react-router';
import Link from '@mui/material/Link';
import Person from '@mui/icons-material/Person';
import api from '../../../api/api';
import {
  useAuthActions,
  useEmail,
  useUsername,
} from '../../../services/auth-store';
import { TO_MAIN } from '../../../utils/route-constants';
import { IconButton, PopoverOrigin } from '@mui/material';

const styles = {
  toolbar: {
    despley: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

const anchorOrigin: PopoverOrigin = {
  vertical: 'bottom',
  horizontal: 'right',
};
const transformOrigin: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'right',
};

export default function HeaderBar() {
  const username = useUsername();
  const email = useEmail();
  const { setAuthStatus } = useAuthActions();
  const { mutate, isSuccess } = useMutation({
    mutationFn: api.auth.logout,
  });

  const handleLogout = () => {
    setAnchorEl(null);
    mutate();
  };

  const handleToSettings = () => {
    setAnchorEl(null);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenAccountMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAccountMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (isSuccess) {
      setAuthStatus({ isAuth: false, username: '', email: '', _id: '' });
    }
  }, [isSuccess]);
  return (
    <AppBar position="fixed">
      <Toolbar sx={styles.toolbar}>
        <Link
          component={RouterLink}
          variant="h6"
          underline="none"
          to={TO_MAIN}
          color="inherit"
        >
          Doski
        </Link>
        <IconButton
          onClick={handleOpenAccountMenu}
          size="small"
          sx={{ ml: 2 }}
          color="inherit"
        >
          <Person color="inherit" fontSize="large" />
        </IconButton>
        <AccountMenu
          anchorEl={anchorEl}
          handleToSettings={handleToSettings}
          closeHandler={handleCloseAccountMenu}
          anchorOrigin={anchorOrigin}
          transformOrigin={transformOrigin}
          handleLogout={handleLogout}
          username={username}
          email={email}
        />
        {/* <Typography variant="h6">{username}</Typography> */}
      </Toolbar>
    </AppBar>
  );
}
