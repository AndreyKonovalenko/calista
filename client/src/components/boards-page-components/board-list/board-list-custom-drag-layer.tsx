import React, { memo } from 'react';
import {
  Box,
  Button,
  Typography,
  useTheme,
  Stack,
  List,
  ListItem,
} from '@mui/material';
import { useDragLayer } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

import CardComponent from '../card-component/card-component';

const BoardListCustomDragLayer = memo(function BaoardList(props: {
  id: string;
}) {
  const { id } = props;
  const { spacing, palette } = useTheme();
  const cardsMoch: number[] = [1, 3, 4, 4, 4, 4, 4];
  const { isDragging, item, currentOffset, initialOffset } = useDragLayer(monitor => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    initialOffset: monitor.getInitialSourceClientOffset(),
  }));

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
   
  console.log('offsets', currentOffset, initialOffset)

  if (initialOffset)
  return isDragging && id == item.id && currentOffset ? (
    <Box
      sx={{
        width: spacing(34),
        height: '100%',
        positon: 'fiexed',
        top: '0',
        left: '0',
        pointerEvents: 'none',
      }}
    >
      <Stack
        spacing={2}
        sx={{
          width: spacing(34),
          backgroundColor: palette.listBackground.main,
          transform: `rotate(7deg) translate(${currentOffset.x - initialOffset?.x}px, ${currentOffset.y}px)`,
          borderRadius: spacing(2),
          maxHeight: '100%',
          position: 'relative',
          flexShrink: 0,
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
    </Box>
  ) : null;
});

export default BoardListCustomDragLayer;
