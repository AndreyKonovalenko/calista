import React from 'react';
import { useSearchParams } from 'react-router';
import { Link, Typography, Container, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { TO_MAIN } from '../../utils/route-constants';
import { useVerifyPendingEmail } from '../../api/auth-api-queries';
import { isAxiosError } from 'axios';
import LoadingBage from '../../components/loading-bage/loading-bage';
import { theme } from '../../styles/theme';

const styles = {
  container: {
    mt: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  form: {
    pl: 2,
    pr: 2,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    mt: 2,
  },
};

const PendingEmailVerificationPage = (): JSX.Element => {
  const [URLSearchParams] = useSearchParams();
  const token = URLSearchParams.get('token');
  const { data, error, isLoading } = useVerifyPendingEmail(token ? token : '');

  const success =
    data && data.emailVerified ? (
      <Box sx={styles.content}>
        <Typography variant="h6" align="center">
          {data.message}
        </Typography>
        <Link
          component={RouterLink}
          variant="h6"
          textAlign="center"
          to={TO_MAIN}
          underline="none"
        >
          Go to Main Page.
        </Link>
      </Box>
    ) : null;
  const fail = isAxiosError(error);

  return (
    <Container maxWidth="md" sx={styles.container}>
      <Typography
        variant="h4"
        align="center"
        noWrap
        color={theme.palette.text.secondary}
      >
        Pending email verification
      </Typography>
      {isLoading ? <LoadingBage /> : null}
      {success}
      {fail}
    </Container>
  );
};
export default PendingEmailVerificationPage;
