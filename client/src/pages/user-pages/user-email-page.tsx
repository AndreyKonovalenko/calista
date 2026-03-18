import React from 'react';
import { Container, Typography, Grid, TextField, Button } from '@mui/material';
import { useEmail } from '../../services/auth-store';

const UserEmailPage = () => {
  const email = useEmail();
  // const { mutate, data } = useLogin();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
    // mutate({
    //   email: data.get('email') as string,
    // });
  };
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid size={12}>
          <Typography variant="h4">Email</Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="h6">Current email</Typography>
          <Typography variant="body1">
            Your current email adress is {email}
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
              id="email"
              label="Enter new email adress"
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
      </Grid>
    </Container>
  );
};

export default UserEmailPage;
