import React from 'react';
import { Box, useTheme, List } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import BoardCard from '../board-card/bard-card';
import BoardListContent from './board-list-content';
import BoardListDndContainer from './board-list-dnd-container';
import { TList } from '../../../utils/types';

const BoardList = (props: TList) => {
  const { name, _id, pos, cards } = props;
  const { spacing } = useTheme();

  const cardsList = Object.keys(cards)
    .sort((a, b) => {
      if (cards[a].pos < cards[b].pos) return -1;
      if (cards[a].pos > cards[b].pos) return 1;
      return 0;
    })
    .map(key => (
      <BoardCard
        key={uuidv4()}
        name={cards[key].name}
        _id={cards[key]._id}
        pos={cards[key].pos}
        listId={_id}
      />
    ));

  return (
    <Box
      sx={{
        width: spacing(34),
        borderRadius: spacing(2),
      }}
    >
      <BoardListDndContainer _id={_id} name={name} pos={pos} cards={cards}>
        <BoardListContent name={name} cards={cards} _id={_id}>
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
            {cardsList}
          </List>
        </BoardListContent>
      </BoardListDndContainer>
    </Box>
  );
};

export default BoardList;
