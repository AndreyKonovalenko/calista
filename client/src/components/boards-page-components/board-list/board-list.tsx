import React from 'react';
import { Box, useTheme, List } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import BoardCard from '../board-card/bard-card';
import BoardListContent from './board-list-content';
import BoardListDndContainer from './board-list-dnd-container';
import { IList } from '../../../utils/types';

const BoardList = (props: IList) => {
  const { name, _id, pos, cards } = props;
  const { spacing } = useTheme();

  const cardsList =
    cards.length > 0 ? (
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
        {cards.map(element => (
          <BoardCard
            key={uuidv4()}
            name={element.name}
            _id={element._id}
            pos={element.pos}
            listId={_id}
          />
        ))}
      </List>
    ) : null;

  return (
    <Box
      sx={{
        width: spacing(34),
        borderRadius: spacing(2),
      }}
    >
      <BoardListDndContainer _id={_id} name={name} pos={pos} cards={cards}>
        <BoardListContent name={name} cards={cards} _id={_id}>
          {cardsList}
        </BoardListContent>
      </BoardListDndContainer>
    </Box>
  );
};

export default BoardList;
