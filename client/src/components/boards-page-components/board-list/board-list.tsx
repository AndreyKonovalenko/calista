import React from 'react';
import { Box, useTheme, List, ListItem } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import CardComponent from '../card-component/card-component';
import BoardListContent from './board-list-content';
import BoardListDraggable from './board-list-draggable';
import BoardListDropContainer from './board-list-drop-container';
// import BoardListCustomDragLayer from './board-list-custom-drag-layer';

const BoardList = (props: { name: string; id: string }) => {
  const { name, id } = props;
  const { spacing } = useTheme();
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
    <Box
      sx={{
        width: spacing(34),
        height: '100%',
        borderRadius: spacing(2),
      }}
    >
      <BoardListDropContainer id={id}>
        <BoardListDraggable id={id} name={name}>
          <BoardListContent name={name} id={id}>
            {cardsList}
          </BoardListContent>
        </BoardListDraggable>
        {/* <BoardListCustomDragLayer id={id} />  */}
      </BoardListDropContainer>
    </Box>
  );
};

export default BoardList;
