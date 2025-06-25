import React from 'react';
import { Box, useTheme, List } from '@mui/material';
// import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router';
// import BoardCard from '../board-card/bard-card';
import BoardListContent from './board-list-content';
import BoardListDndContainer from './board-list-dnd-container';
// import { useCreateCard } from '../../../api/cards-api-queries';
import { invariantId } from '../../../utils/utils';
import { useList } from '../../../services/list-store';

const BoardList = (props: { _id: string }) => {
  const { id: boardId } = useParams();
  invariantId(boardId);
  const { _id } = props;
  const list = useList(_id);
  if (!list) {
    return null;
  }
  const { name, pos } = list;
  const { spacing } = useTheme();
  
  // const createCardQuery = useCreateCard();

  // const handleCreateNewCard = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   let pos = 16384;
  //   const keysArr = Object.keys(cards);
  //   if (keysArr.length > 0) {
  //     keysArr.sort((a, b) => {
  //       if (cards[a].pos < cards[b].pos) return -1;
  //       if (cards[a].pos > cards[b].pos) return 1;
  //       return 0;
  //     });
  //     const last = cards[keysArr[keysArr.length - 1]].pos;
  //     pos = pos + last;
  //   }
  //   const formData = new FormData(event.currentTarget);
  //   createCardQuery.mutate({
  //     name: formData.get('newItemName'),
  //     boardId: boardId,
  //     listId: _id,
  //     pos: pos,
  //   });
  // };

  // const cardsList = Object.keys(cards)
  //   .sort((a, b) => {
  //     if (cards[a].pos < cards[b].pos) return -1;
  //     if (cards[a].pos > cards[b].pos) return 1;
  //     return 0;
  //   })
  //   .map(key => (
  //     <BoardCard
  //       key={uuidv4()}
  //       name={cards[key].name}
  //       _id={cards[key]._id}
  //       pos={cards[key].pos}
  //       listId={_id}
  //     />
  //   ));

  return (
    <Box
      sx={{
        width: spacing(34),
        borderRadius: spacing(2),
      }}
    >
      <BoardListDndContainer _id={_id} name={name} pos={pos}>
        <BoardListContent name={name} _id={_id} handleCreateNewCard={() => {}}>
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
            {/* {cardsList} */}
          </List>
        </BoardListContent>
      </BoardListDndContainer>
    </Box>
  );
};

export default BoardList;
