import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { useUsername, useEmail } from '../../services/auth-store';

const UserProfilePage = () => {
  const name = useUsername();
  const email = useEmail();
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid size={12}>
          <Typography variant="h4">Profile</Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="h6">Profile photo</Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="h6">About you</Typography>
          <Typography variant="body2">name: {name}</Typography>
          <Typography variant="body2">email: {email}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfilePage;
