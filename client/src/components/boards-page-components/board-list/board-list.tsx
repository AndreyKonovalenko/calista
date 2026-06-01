import React, { useCallback } from 'react';
import { Box, List } from '@mui/material';
import BoardCard from '../board-card/bard-card';
import BoardListContent from './board-list-content';
import BoardListDndContainer from './board-list-dnd-container';
import { useCreateCard } from '../../../api/cards-api-queries';
import { useList } from '../../../services/list-store';
import { useSortedCardsByListId } from '../../../services/card-store';
import { useCards } from '../../../services/card-store';

const BoardList = (props: { _id: string }) => {
  const { _id: listId } = props;
  const list = useList(listId);
  const sortedCards = useSortedCardsByListId(listId); // ← Fixed spelling
  const cards = useCards();
  const createCardQuery = useCreateCard();

  if (!list) {
    console.warn('BoardList: List not found for id:', listId);
    return null;
  }

  const { name, pos } = list;

  const handleCreateNewCard = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      let pos = 16384;
      if (cards && sortedCards && sortedCards?.length > 0) {
        pos = cards[sortedCards[sortedCards.length - 1]].pos + pos;
      }
      const formData = new FormData(event.currentTarget);
      const name = formData.get('newItemName') as string;
      if (!name?.trim()) return;

      createCardQuery.mutate({
        name,
        listId,
        pos,
      });
    },
    [listId, cards, sortedCards, createCardQuery],
  );

  const cardsList = sortedCards
    ? sortedCards.map(cardId => <BoardCard key={cardId} _id={cardId} />)
    : null;

  return (
    <Box
      sx={{
        width: 272,
        borderRadius: 2,
      }}
    >
      <BoardListDndContainer
        _id={listId}
        name={name}
        pos={pos}
        hasCards={cardsList && cardsList?.length > 0 ? true : false}
      >
        <BoardListContent
          name={name}
          _id={listId}
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
