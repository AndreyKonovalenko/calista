import React from 'react';

import BoardCardDndContainer from './bord-card-dnd-container';
import BoardCardContent from './bord-card-content';
import { useCard } from '../../../services/card-store';
import { useGetStatsByCardId } from '../../../services/stats-store';

const BoardCard = (props: { _id: string }) => {
  const { _id } = props;
  const card = useCard(_id);
  const statsByCardId = useGetStatsByCardId(_id);
  console.log(statsByCardId);
  if (!card) {
    return null;
  }
  const { listId, name } = card;

  return (
    <BoardCardDndContainer _id={_id} listId={listId}>
      <BoardCardContent
        name={name}
        quantity={statsByCardId ? statsByCardId.checklistItems.quantity : 0}
        complete={statsByCardId ? statsByCardId.checklistItems.complete : 0}
      />
    </BoardCardDndContainer>
  );
};

export default BoardCard;
