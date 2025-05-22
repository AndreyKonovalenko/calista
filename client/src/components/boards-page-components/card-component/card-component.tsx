import React from 'react';
import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
  ListItem,
} from '@mui/material';
import { Link, useLocation } from 'react-router';

const CardComponent = (props: { name: string; id: string }) => {
  const { name, id } = props;
  const location = useLocation();
  return (
    <Link to={`cards/:${id}`} state={{ background: location }}>
      <ListItem>
        <Card sx={{ minWidth: '100%' }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
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
    </Link>
  );
};

export default CardComponent;
