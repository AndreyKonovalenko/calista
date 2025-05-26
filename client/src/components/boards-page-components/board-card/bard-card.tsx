import React from 'react';

import BoardCardDndContainer from './bord-card-dnd-container';
import BoardCardContent from './bord-card-content';

const BoardCard = (props: { name: string; id: string; pos: number }) => {
  const { name, id, pos } = props;

  return (
    <BoardCardDndContainer id={id} pos={pos}>
      <BoardCardContent name={name} />
    </BoardCardDndContainer>
  );
};

export default BoardCard;
