import React, { useCallback} from 'react';
import { Box, List } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router';
import BoardCard from '../board-card/bard-card';
import BoardListContent from './board-list-content';
import BoardListDndContainer from './board-list-dnd-container';
import { useCreateCard } from '../../../api/cards-api-queries';
import { useList } from '../../../services/list-store';
import { useSortedCardsByListId } from '../../../services/card-store';
import { useCards } from '../../../services/card-store';

const BoardList = (props: { _id: string }) => {
  const { id: boardId } = useParams();
  if (!boardId) {
    return null;
  }
  const { _id } = props;
  const list = useList(_id);
  if (!list) {
    return null;
  }
  const { name, pos } = list;
  const sorterdCards = useSortedCardsByListId(_id);
  const cards = useCards();

  const createCardQuery = useCreateCard();

  const handleCreateNewCard = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      let pos = 16384;
      if (cards && sorterdCards && sorterdCards?.length > 0) {
        pos = cards[sorterdCards[sorterdCards.length - 1]].pos + pos;
      }
      const formData = new FormData(event.currentTarget);
      createCardQuery.mutate({
        name: formData.get('newItemName'),
        boardId: boardId,
        listId: _id,
        pos: pos,
      });
    },
    [_id, cards, sorterdCards],
  );

  const cardsList = sorterdCards
    ? sorterdCards.map(cardId => <BoardCard key={uuidv4()} _id={cardId} />)
    : null;


  return (
    <Box
      sx={{
        width: 272,
        borderRadius: 2,
      }}
    >
      <BoardListDndContainer
        _id={_id}
        name={name}
        pos={pos}
        hasCards={cardsList && cardsList?.length > 0 ? true : false}
      >
        <BoardListContent
          name={name}
          _id={_id}
          handleCreateNewCard={handleCreateNewCard}
        >
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
