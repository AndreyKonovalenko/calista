import React from 'react';
import { useSearchParams } from 'react-router';
import { Box, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { TO_LOGIN } from '../../utils/route-constants';
import { useVerifyEmail } from '../../api/auth-api-queries';

const VerificationPage = (): JSX.Element => {
  const [URLSearchParams] = useSearchParams();
  const token = URLSearchParams.get('token');
  const { data } = useVerifyEmail(token ? token : '');

  return (
    <Box sx={{ margin: 10 }}>
      <Typography
        variant="h4"
        sx={theme => ({
          color: theme.palette.text.secondary,
        })}
      >
        Email verification page.
      </Typography>
      <Typography>
        {data && data.emailVerified ? data.message : null}
      </Typography>
      <Link component={RouterLink} variant="h6" to={TO_LOGIN} underline="none">
        Go to Login Page.
      </Link>
    </Box>
  );
};
export default VerificationPage;
