import React from 'react';

import BoardCardDndContainer from './bord-card-dnd-container';
import BoardCardContent from './bord-card-content';
import { useCard } from '../../../services/card-store';

const BoardCard = (props: {_id: string}) => {
  const { _id } = props;
  const card = useCard(_id)
  if (!card){
    return null
  }
  const {listId, name, pos} = card;

  return (
    <BoardCardDndContainer _id={_id} pos={pos} listId={listId}>
      <BoardCardContent name={name} />
    </BoardCardDndContainer>
  );
};

export default BoardCard;
