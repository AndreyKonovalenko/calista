import React from 'react';
import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
  ListItem,
} from '@mui/material';

const CardComponent = (props: { name: string; id: string }) => {
  const { name } = props;
  return (
    <ListItem>
      <Card sx={{ minWidth: '100%' }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </ListItem>
  );
};

export default CardComponent;
