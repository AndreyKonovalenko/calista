import React from 'react';

import { Outlet, useParams } from 'react-router';
import { Grid, MenuList, MenuItem, Box } from '@mui/material';
import { TO_USER } from '../../utils/route-constants';

const styles = {
  container: {
    height: '100vh',
    flexShrink: 0,
  },
  menu: {
    minWidth: { xs: '100%', md: 256 },
    maxWidth: { xs: '100%', md: 256 },
    borderRight: { md: '1px solid', xs: 'none' },
    borderBottom: { md: 'none', xs: '1px solid' },
    borderColor: { md: 'divider', xs: 'divider' },
    minHeight: { sx: '20vh', md: '100vh' },
  },
  content: {
    flexShrink: 0,
    minHeight: { xs: '80vh', md: '100vh' },
  },
};

const UserAccountPage = () => {
  const { userId } = useParams();
  console.log(userId);
  return (
    <Grid container size={12} sx={styles.container}>
      <Grid size={{ xs: 12, md: 2 }} sx={styles.menu}>
        <Box sx={{ p: 2 }}>
          <MenuList>
            <MenuItem component="a" href={`${TO_USER}/${userId}/account`}>
              Account
            </MenuItem>
            <MenuItem component="a" href={`${TO_USER}/${userId}/profile`}>
              Profile
            </MenuItem>
            <MenuItem component="a" href={`${TO_USER}/${userId}/email`}>
              Email
            </MenuItem>
            <MenuItem component="a" href={`${TO_USER}/${userId}/security`}>
              Security & Privacy
            </MenuItem>
          </MenuList>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 10 }} sx={styles.content}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default UserAccountPage;
