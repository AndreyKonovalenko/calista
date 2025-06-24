import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import LogoutIcon from '@mui/icons-material/Logout';
import { Person } from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../services/auth-store';
import { Link as RouterLink } from 'react-router';
import Link from '@mui/material/Link';
import api from '../../api/calista-api';

import { TO_LOGIN, TO_MAIN } from '../../utils/route-constants';
import { Stack, Typography } from '@mui/material';

export default function HeaderBar() {
  const { isAuth, username, reset } = useAuthStore(state => state);
  const { mutate } = useMutation({
    mutationFn: api.auth.logout,
  });

  const handleLogout = () => {
    reset();
    mutate();
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link
            component={RouterLink}
            variant="h6"
            underline="none"
            to={TO_MAIN}
            color="inherit"
          >
            Todo-boards
          </Link>
        </Box>
        {isAuth && (
          <Stack direction="row" spacing={4}>
            <Stack direction="row" sx={{ alignItems: 'center' }} spacing={1}>
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
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <LogoutIcon fontSize="large" />
            </Link>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}
