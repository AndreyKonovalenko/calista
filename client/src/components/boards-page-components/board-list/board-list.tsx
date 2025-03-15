import React from 'react';
import {
  Box,
  Button,
  Typography,
  useTheme,
  Stack,
  List,
  ListItem,
} from '@mui/material';

import { v4 as uuidv4 } from 'uuid';
import { TitleTextAreaStyled } from '../boards-page-styled-elements/boards-page-styled-elements';

import CardComponent from '../card-component/card-component';
import BoardListActionMenu from '../bpard-list-action-menu/board-list-action-menu';
import { useState } from 'react';

const BoardList = (props: { name: string; id: string }) => {
  const { name } = props;
  const [listTitle, setListTitle] = useState(name);
  const [editing, setEditing] = useState(false);
  const { spacing, palette } = useTheme();
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
    <Box sx={{ width: spacing(34), height: '100%' }}>
      <Stack
        spacing={2}
        sx={{
          width: spacing(34),
          backgroundColor: palette.listBackground.main,
          borderRadius: spacing(2),
          maxHeight: '100%',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        <Box sx={{ pl: spacing(2), pt: spacing(2), pr: spacing(2) }}>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            {editing ? (
              <TitleTextAreaStyled
                autoFocus
                rows={1}
                value={listTitle}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setListTitle(event.target.value);
                }}
                onFocus={(event: React.FocusEvent<HTMLTextAreaElement>) => {
                  event.target.select();
                }}
                onBlur={() => setEditing(false)}
              />
            ) : (
              <Box onClick={() => setEditing(true)} sx={{ cursor: 'pointer' }}>
                <Typography variant="h6">{listTitle}</Typography>
              </Box>
            )}
            <BoardListActionMenu />
          </Stack>
        </Box>
        {cardsList}
        <Box>
          <Button>+ Add a card</Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default BoardList;
