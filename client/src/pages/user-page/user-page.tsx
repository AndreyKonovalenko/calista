import React from 'react';
import { Grid, MenuList, MenuItem, Box } from '@mui/material';

const styles = {
  container: {
    height: '100vh',
    flexShrink: 0,
  },
  menu: {
    minWidth: {xs: "100%", md:256},
    maxWidth: {xs: "100%", md:256},
    flexShrink: 0,
    '--Grid-borderWidth': '1px',
    borderRight: {md: 'var(--Grid-borderWidth) solid', xs: null},
    borderBottom: {md: null, xs: 'var(--Grid-borderWidth) solid'},
    borderColor: {md: 'divider', xs: 'divider'},
    minHeight: { sx: '20vh', md: '100vh' },
  },
  content: {
    flexShrink: 0,
    minHeight: { xs: '80vh', md: '100vh' },
  },
};

const UserPage = () => {
  return (
    <Grid container size={12} sx={styles.container}>
      <Grid size={{ xs: 12, md: 2 }} sx={styles.menu}>
        <Box sx={{p:2}}>
          <MenuList>
          <MenuItem onClick={()=>{}}>
            Account
          </MenuItem>
          <MenuItem onClick={()=>{}}>
            Profile
          </MenuItem>
          <MenuItem onClick={()=>{}}>
           Email
          </MenuItem>
          <MenuItem onClick={()=>{}}>
            Security & Privacy
          </MenuItem>
        </MenuList>   
      </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 10 }} sx={styles.content}>
        <Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default UserPage;
