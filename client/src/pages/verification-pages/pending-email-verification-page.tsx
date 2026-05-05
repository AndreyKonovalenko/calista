import React from 'react';
import { useSearchParams } from 'react-router';
import {
  Link,
  Typography,

  Container,
  Box,
} from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { TO_LOGIN } from '../../utils/route-constants';
import { useVerifyPendingEmail } from '../../api/auth-api-queries';
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

const PendingEmailVerificationPage = (): JSX.Element => {
  const [URLSearchParams] = useSearchParams();
  const token = URLSearchParams.get('token');
  const { data, error, isLoading } = useVerifyPendingEmail(token ? token : '');


  const success =
    data && data.emailVerified ? (
      <>
        <Typography variant="h6">{data.message.split('.')[0]}</Typography>
        <Typography variant="h6">{data.message.split('.')[1]}</Typography>
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
  const fail = isAxiosError(error) 

  return (
    <Container maxWidth="xs" sx={styles.container}>
      <Typography variant="h4" color={theme.palette.text.secondary}>
        Pending email verification
      </Typography>
      <Box sx={styles.content}>
        {isLoading ? <LoadingBage /> : null}
        {success}
        {fail}
      </Box>
    </Container>
  );
};
export default PendingEmailVerificationPage;
