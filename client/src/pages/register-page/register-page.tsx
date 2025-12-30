// import { useQuery, useMutation } from '@tanstack/react-query';
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRegister } from '../../api/auth-api-queries';
import { toast } from 'react-toastify';

export default function RegisterPage(): JSX.Element {
  const { mutate } = useRegister();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('username') === '') {
      toast.error('Username should not be empty.');
      return;
    }

    if (data.get('email') === '') {
      toast.error('Email should not be empty.');
      return;
    }

    if (data.get('password') === '') {
      toast.error('Password should not be empty.');
      return;
    }
    if (data.get('confirmPassword') === '') {
      toast.error('Confirmation password should not be empty.');
      return;
    }

    if (data.get('password') != data.get('confirmPossword')) {
      toast.error('The password and confirmation password do not match.');
      return;
    }
    mutate({
      username: data.get('username') as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
    });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Create an account
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
          </Grid>
          <Grid size={12}>
            <TextField
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="email"
              autoComplete="new-password"
            />
          </Grid>
          <Grid size={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
          </Grid>
          <Grid size={12}>
            <TextField
              required
              fullWidth
              name="confirmPossword"
              label="Confirm password"
              type="password"
              id="confirmPossword"
              autoComplete="new-password"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create an account
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid>
            <Link href="/login" variant="body2">
              Already have an account? Login
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
