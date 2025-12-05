import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { TO_MAIN } from '../../utils/route-constants';
import { useLocation } from 'react-router';

const ErrorPage = (): JSX.Element => {
  const location = useLocation();
  const message = location.state.message;
  console.log(location);
  return (
    <Box sx={{ margin: 10 }}>
      <Typography
        variant="h4"
        sx={theme => ({
          color: theme.palette.text.secondary,
        })}
      >
        Bad Request 400
      </Typography>
      <Typography
        variant="body1"
        sx={theme => ({
          color: theme.palette.text.secondary,
        })}
      >
        {message}
      </Typography>
      <Link component={RouterLink} variant="h6" to={TO_MAIN} underline="none">
        Return to main page
      </Link>
    </Box>
  );
};
export default ErrorPage;
