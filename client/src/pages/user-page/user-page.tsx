import React from 'react';
import { Grid } from '@mui/material';

const styles = {
  container: {
    height: '100vh',
    flexShrink: 0,
  },
  menu: {
    flexShrink: 0,
    '--Grid-borderWidth': '1px',
    borderRight: 'var(--Grid-borderWidth) solid',
    borderColor: 'divider',
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
        sfasdf
      </Grid>
      <Grid size={{ xs: 12, md: 10 }} sx={styles.content}>
        afdf
      </Grid>
    </Grid>
  );
};

export default UserPage;
