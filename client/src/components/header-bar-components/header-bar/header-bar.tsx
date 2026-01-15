import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Person } from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import AccountMenu from '../account-menu/account-menu';
import {
  useAuthActions,
  useIsAuth,
} from '../../../services/auth-store';

import { Link as RouterLink } from 'react-router';
import Link from '@mui/material/Link';
import api from '../../../api/api';

import { TO_MAIN } from '../../../utils/route-constants';
import { IconButton, Stack, PopoverOrigin } from '@mui/material';

const styles = {
  box: {
    flexGrow: 1,
  },
  stack: {
    alignItems: 'center',
  },
  link: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
  const { setAuthStatus } = useAuthActions();
  const isAuth = useIsAuth();
  // const username = useUsername();
  const { mutate, isSuccess } = useMutation({
    mutationFn: api.auth.logout,
  });

  const handleLogout = () => {
    setAnchorEl(null)
    setAuthStatus({ isAuth: false, username: '' });
    mutate();
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
  useEffect(()=> {
    console.log(isSuccess)
  },[isSuccess])

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box sx={styles.box}>
          <Link
            component={RouterLink}
            variant="h6"
            underline="none"
            to={TO_MAIN}
            color="inherit"
          >
            Doski
          </Link>
        </Box>
        {isAuth && (
          <Stack direction="row" spacing={4}>
              <IconButton
                onClick={handleOpenAccountMenu}
                size="small"
                sx={{ ml: 2 }}
              >
                <Person color="inherit" fontSize="large" />
              </IconButton>
               <AccountMenu
                  anchorEl={anchorEl}
                  closeHandler={handleCloseAccountMenu}
                  anchorOrigin={anchorOrigin}
                  transformOrigin={transformOrigin}
                  handleLogout={handleLogout}
               />
              {/* <Typography variant="h6">{username}</Typography> */}
            </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}
