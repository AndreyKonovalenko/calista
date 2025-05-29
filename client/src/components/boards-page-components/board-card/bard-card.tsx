import React from 'react';

import BoardCardDndContainer from './bord-card-dnd-container';
import BoardCardContent from './bord-card-content';
import { ICardTrimmed } from '../../../utils/types';

const BoardCard = (props: ICardTrimmed & { listId: string }) => {
  const { name, _id, pos, listId } = props;

  return (
    <BoardCardDndContainer _id={_id} pos={pos} listId={listId}>
      <BoardCardContent name={name} />
    </BoardCardDndContainer>
  );
};

export default BoardCard;
