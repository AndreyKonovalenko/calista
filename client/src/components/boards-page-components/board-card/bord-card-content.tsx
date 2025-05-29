import React from 'react';
import { CardContent, Typography, Card } from '@mui/material';

const BoardCardContent = (props: { name: string }) => {
  const { name } = props;
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BoardCardContent;
