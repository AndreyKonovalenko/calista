import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { TO_MAIN } from '../../utils/route-constants';

const NotFoundPage = (): JSX.Element => {
  return (
    <Box sx={{ margin: 10 }}>
      <Typography
        variant="h4"
        sx={theme => ({
          color: theme.palette.text.secondary,
        })}
      >
        Page not found 404
      </Typography>
      <Link component={RouterLink} variant="h6" to={TO_MAIN} underline="none">
        Return to main page
      </Link>
    </Box>
  );
};
export default NotFoundPage;
