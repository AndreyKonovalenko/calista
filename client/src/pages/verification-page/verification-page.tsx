import React from 'react';
import { useSearchParams } from 'react-router';
import {
  Link,
  Typography,
  Grid,
  Button,
  TextField,
  Container,
  Box,
} from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { TO_LOGIN } from '../../utils/route-constants';
import { useVerifyEmail } from '../../api/auth-api-queries';
import { isAxiosError } from 'axios';
import LoadingBage from '../../components/loading-bage/loading-bage';
import { theme } from '../../styles/theme';

const styles = {
  container: {
    mt: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    pl: 2,
    pr: 2,
  },
  content: {
    mt: 2,
  },
};

const VerificationPage = (): JSX.Element => {
  const [URLSearchParams] = useSearchParams();
  const token = URLSearchParams.get('token');
  const { data, error, isLoading } = useVerifyEmail(token ? token : '');

  const success =
    data && data.emailVerified ? (
      <>
        <Typography variant="h6">{data.message.split(".")[0]}</Typography>
        <Typography variant="h6">{data.message.split(".")[1]}</Typography>
        <Link
          component={RouterLink}
          variant="h6"
          to={TO_LOGIN}
          underline="none"
        >
          Go to Login Page.
        </Link>
      </>
    ) : null;
  const fail = isAxiosError(error) ? (
    <Grid
      container
      component="form"
      onSubmit={() => {}}
      size={12}
      columns={12}
      spacing={2}
      sx={styles.form}
    >
      <Grid size={12}>
        <Typography variant="h6" color={theme.palette.error.main}>
          {error.response?.data.message}
        </Typography>
      </Grid>
      <Grid size={12}>
        <Typography variant="h6">Resend Verification Email</Typography>
      </Grid>
      <Grid size={12}>
        <TextField
          fullWidth
          required
          name="email"
          label="Email"
          type="email"
          id="email"
          autoComplete="new-password"
        />
      </Grid>
      <Grid size={12}>
        <Button type="submit" variant="contained">
          Send
        </Button>
      </Grid>
    </Grid>
  ) : null;

  return (
    <Container maxWidth="xs" sx={styles.container}>
      <Typography variant="h4" color={theme.palette.text.secondary}>
        Email verification
      </Typography>
      <Box sx={styles.content}>
        {isLoading ? <LoadingBage /> : null}
        {success}
        {fail}
      </Box>
    </Container>
  );
};
export default VerificationPage;
