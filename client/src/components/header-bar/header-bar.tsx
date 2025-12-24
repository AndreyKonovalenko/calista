import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import LogoutIcon from '@mui/icons-material/Logout';
import { Person } from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import {
  useAuthActions,
  useIsAuth,
  useUsername,
} from '../../services/auth-store';

import { Link as RouterLink } from 'react-router';
import Link from '@mui/material/Link';
import api from '../../api/api';

import { TO_LOGIN, TO_MAIN } from '../../utils/route-constants';
import { Stack, Typography } from '@mui/material';

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

export default function HeaderBar() {
  const { setAuthStatus } = useAuthActions();
  const isAuth = useIsAuth();
  const username = useUsername();
  const { mutate } = useMutation({
    mutationFn: api.auth.logout,
  });

  const handleLogout = () => {
    setAuthStatus({ isAuth: false, username: '' });
    mutate();
  };

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
            <Stack direction="row" sx={styles.stack} spacing={1}>
              <Person color="inherit" fontSize="large" />
              <Typography variant="h6">{username}</Typography>
            </Stack>
            <Link
              component={RouterLink}
              variant="h6"
              underline="none"
              to={TO_LOGIN}
              color="inherit"
              onClick={handleLogout}
              sx={styles.link}
            >
              <LogoutIcon fontSize="large" />
            </Link>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}
