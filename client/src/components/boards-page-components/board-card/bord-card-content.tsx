import React from 'react';
import { CardContent, Typography, Card } from '@mui/material';

const BoardCardContent = (props: {
  name: string;
  quantity: number;
  complete: number;
}) => {
  const { name, quantity, complete } = props;
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body1" component="div">
          {`${quantity}/${complete}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BoardCardContent;
