import React from 'react';
import { useParams } from 'react-router';
import { useCard } from '../../services/card-store';
import Card from '../../components/card-page-components/card/card';

const CardPageOnBackground = () => {
  const { cardId } = useParams();
  if (!cardId) {
    return;
  }
  const card = useCard(cardId);
  if (!card) {
    return;
  }
  const { _id, boardId, description, name } = card;
  return card ? (
    <Card _id={_id} boardId={boardId} name={name} description={description} />
  ) : null;
};

export default CardPageOnBackground;
