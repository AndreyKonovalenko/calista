import React from 'react';
import { CircularProgress, Box } from '@mui/material';

export default function LoadingBage(): JSX.Element {
  return (
    <Box
      sx={{
        width: '100%',
        height: '40%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
}
