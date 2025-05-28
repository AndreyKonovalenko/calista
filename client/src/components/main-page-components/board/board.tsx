import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { TO_BOARDS } from '../../../utils/route-constants';
import { IBoardTrimmed } from '../../../utils/types';

const BoardCardStyled = {
  minHeight: 100,
  minWidth: 180,
};

const cardActionAreaStyled = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  minHeight: 'inherit',
  alignItems: 'flex-start',
};

const Board = (props: IBoardTrimmed) => {
  const { name, _id } = props;
  return (
    <Link
      component={RouterLink}
      variant="h6"
      underline="none"
      to={`${TO_BOARDS}/${_id}`}
      color="inherit"
    >
      <Card sx={BoardCardStyled}>
        <CardActionArea sx={cardActionAreaStyled}>
          <CardContent>
            <Typography
              variant="h6"
              sx={theme => ({
                color: theme.palette.text.primary,
              })}
            >
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default Board;
