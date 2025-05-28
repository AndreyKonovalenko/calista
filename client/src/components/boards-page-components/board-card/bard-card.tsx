import React from 'react';

import BoardCardDndContainer from './bord-card-dnd-container';
import BoardCardContent from './bord-card-content';
import { ICardTrimmed } from '../../../utils/types';

const BoardCard = (props: ICardTrimmed) => {
  const { name, _id, pos } = props;

  return (
    <BoardCardDndContainer _id={_id} pos={pos}>
      <BoardCardContent name={name} />
    </BoardCardDndContainer>
  );
};

export default BoardCard;
