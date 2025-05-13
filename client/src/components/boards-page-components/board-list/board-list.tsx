import React from 'react';
import { Box, useTheme, List } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import CardComponent from '../card-component/card-component';
import BoardListContent from './board-list-content';
import BoardListDndContainer from './board-list-dnd-container';

const BoardList = (props: { name: string; id: string, pos: number }) => {
  const { name, id, pos } = props;
  const { spacing } = useTheme();
  const cardsMoch: number[] = [1, 3, 4, 4, 4, 4, 4];
  console.log(uuidv4());

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
        {cardsMoch.map(element => (
          <CardComponent key={uuidv4()} text={element} />
        ))}
      </List>
    ) : null;

  return (
    <Box
      sx={{
        width: spacing(34),
        height: '100%',
        borderRadius: spacing(2),
      }}
    >
      <BoardListDndContainer id={id} name={name} pos={pos}>
        <BoardListContent name={name} id={id}>
          {cardsList}
        </BoardListContent>
      </BoardListDndContainer>
    </Box>
  );
};

export default BoardList;
