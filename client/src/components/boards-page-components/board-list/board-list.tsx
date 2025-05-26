import React from 'react';
import { Box, useTheme, List } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import BoardCard from '../board-card/bard-card';
import BoardListContent from './board-list-content';
import BoardListDndContainer from './board-list-dnd-container';

const BoardList = (props: {
  name: string;
  id: string;
  pos: number;
  cards: Array<{ _id: string; name: string; pos: number }>;
}) => {
  const { name, id, pos, cards } = props;
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
            id={element._id}
            pos={element.pos}
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
      <BoardListDndContainer id={id} name={name} pos={pos} cards={cards}>
        <BoardListContent name={name} cards={cards} id={id}>
          {cardsList}
        </BoardListContent>
      </BoardListDndContainer>
    </Box>
  );
};

export default BoardList;
