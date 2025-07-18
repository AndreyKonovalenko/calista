import React, { useRef } from 'react';
import { Box } from '@mui/material';
import { useHover } from '../../../hooks/use-hover';

import BoardCardDndContainer from './bord-card-dnd-container';
import BoardCardContent from './bord-card-content';
import { useCard } from '../../../services/card-store';

const style = {
  borderStyle: 'solid',
  borderWidth: 'thick',
  borderRadius: 2,
  borderColor: 'primary.main',
};

const BoardCard = (props: { _id: string }) => {
  const hoverRef = useRef<HTMLDivElement>(null);
  const hovered = useHover(hoverRef);
  const { _id } = props;
  const card = useCard(_id);
  if (!card) {
    return null;
  }
  const { listId, name } = card;

  return (
    <Box sx={hovered ? style : null} ref={hoverRef}>
      {`the current div is ${hovered ? 'hoverd' : 'unhoverd'}`}
      <BoardCardDndContainer _id={_id} listId={listId}>
        <BoardCardContent name={name} />
      </BoardCardDndContainer>
    </Box>
  );
};

export default BoardCard;
