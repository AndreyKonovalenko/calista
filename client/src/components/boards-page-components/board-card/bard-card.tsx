import React from 'react';

import BoardCardDndContainer from './bord-card-dnd-container';
import BoardCardContent from './bord-card-content';
import { useCard } from '../../../services/card-store';
import { useChecklistsItemsStat } from '../../../services/checklist-item-store';
import { withProfiler } from '../../../utils/withProfiler';

const BoardCard = withProfiler((props: { _id: string }) => {
  const { _id } = props;
  const card = useCard(_id);
  if (!card) {
    return null;
  }
  const stats = useChecklistsItemsStat(_id);

  const { listId, name } = card;

  return (
    <BoardCardDndContainer _id={_id} listId={listId}>
      <BoardCardContent
        name={name}
        quantity={stats.quantity}
        complete={stats.complete}
      />
    </BoardCardDndContainer>
  );
},{id: 'Board Card'});

export default BoardCard;
