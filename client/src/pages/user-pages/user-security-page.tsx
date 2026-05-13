import React from 'react';
import { Container, Typography, Grid, TextField, Button } from '@mui/material';
import { useUpdateEmail } from '../../api/auth-api-queries';

const UserSecurityPage = () => {
  const { mutate } = useUpdateEmail();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
    mutate({
      pendingEmail: data.get('email') as string,
    });
  };
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid size={12}>
          <Typography variant="h4">Security</Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="h6">Change password</Typography>
          <Typography variant="body1">
            You can change your password by providing a new one in the form
            below.
          </Typography>
        </Grid>
        <Grid
          component="form"
          onSubmit={handleSubmit}
          noValidate
          size={12}
          container
          spacing={1}
        >
          <Grid size={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="current_password"
              label="Current password"
              name="email"
              type="password"
              autoComplete="email"
              autoFocus
            />
          </Grid>
          <Grid size={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="new_password"
              label="New password"
              name="email"
              autoComplete="email"
              autoFocus
            />
          </Grid>
          <Grid size={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmPossword"
              label="Confirm new password"
              name="email"
              autoComplete="email"
              autoFocus
            />
          </Grid>
          <Grid size={12}>
            <Button type="submit" variant="contained">
              Save change
            </Button>
          </Grid>
        </Grid>
        <Grid size={12}>
          <Typography variant="h6">Two-set verification</Typography>
          <Typography variant="body1">Work in progress.</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserSecurityPage;
