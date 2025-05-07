import React, { memo } from 'react';
import {
  Box,
  Stack,
  useTheme,
  Typography,
  Button,
  ListItem,
  List,
} from '@mui/material';
import { TDraggableElement } from './board-list-dnd-container';
import CardComponent from '../card-component/card-component';
import { v4 as uuidv4 } from 'uuid';

const BoardListPreview = memo(function BoardListPreview(props: {
  item: TDraggableElement;
}) {
  const { spacing, palette } = useTheme();
  const { item } = props;
  const cardsMoch: number[] = [1, 3, 4, 4, 4, 4, 4];
  const cardsList =
    cardsMoch.length > 0 ? (
      <List
        sx={{
          display: 'flex',
          overflowX: 'auto',
          height: '100%',
          flexDirection: 'column',
          flex: '1 1 auto',
          scrollbarWidth: 'thin',
        }}
      >
        {cardsMoch.map((element, index) => (
          <ListItem key={uuidv4()} id={index.toString()}>
            <CardComponent text={element} />
          </ListItem>
        ))}
      </List>
    ) : null;

  return (
    <Stack
      spacing={2}
      sx={{
        width: spacing(34),
        backgroundColor: palette.listBackground.main,
        borderRadius: spacing(2),
        maxHeight: '100%',
        position: 'relative',
        flexShrink: 0,
        transform: 'rotate(-7deg)',
        WebkitTransform: 'rotate(-7deg)',
      }}
    >
      <Box sx={{ pl: spacing(2), pt: spacing(2), pr: spacing(2) }}>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Box>
            <Typography
              sx={{
                overflow: 'hidden',
                overflowWrap: 'anywhere',
                resize: 'none',
              }}
              variant="h6"
            >
              {item.name}
            </Typography>
          </Box>
        </Stack>
      </Box>
      {cardsList}
      <Box>
        <Button>+ Add a card</Button>
      </Box>
    </Stack>
  );
});
export default BoardListPreview;
