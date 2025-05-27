import React from 'react';

import BoardCardDndContainer from './bord-card-dnd-container';
import BoardCardContent from './bord-card-content';
import { ICard } from '../../../utils/types';

const BoardCard = (props: ICard) => {
  const { name, id, pos } = props;

  return (
    <BoardCardDndContainer id={id} pos={pos}>
      <BoardCardContent name={name} />
    </BoardCardDndContainer>
  );
};

export default BoardCard;
