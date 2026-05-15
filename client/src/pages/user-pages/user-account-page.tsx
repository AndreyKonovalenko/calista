import React from 'react';
import { Container, Typography, Grid } from '@mui/material';

const UserAccountPage = () => {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid size={12}>
          <Typography variant="h4">Account</Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="h6">Account</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserAccountPage;
