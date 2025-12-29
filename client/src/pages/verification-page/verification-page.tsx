import React from 'react';
import { useSearchParams } from 'react-router';
import { Box, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { TO_LOGIN } from '../../utils/route-constants';
import { useVerifyEmail } from '../../api/auth-api-queries';
import { isAxiosError } from 'axios';
import LoadingBage from '../../components/loading-bage/loading-bage';
import { theme } from '../../styles/theme';
const VerificationPage = (): JSX.Element => {
  const [URLSearchParams] = useSearchParams();
  const token = URLSearchParams.get('token');
  const { data, error, isLoading } = useVerifyEmail(token ? token : '');
  console.log(error);

  const success =
    data && data.emailVerified ? (
      <>
        <Typography variant="h6">{data.message}</Typography>
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
  const feil = isAxiosError(error) ? (
    <Typography variant="h6" color={theme.palette.error.main}>
      {error.response?.data.message}
    </Typography>
  ) : null;

  return (
    <Box sx={{ margin: 10 }}>
      <Typography variant="h4" color={theme.palette.text.secondary}>
        Email verification page.
      </Typography>
      {isLoading ? <LoadingBage /> : null}
      {success}
      {feil}
    </Box>
  );
};
export default VerificationPage;
