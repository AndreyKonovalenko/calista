import React from 'react';
import { useParams } from 'react-router';
import { useCard } from '../../services/card-store';
import Card from '../../components/card-page-components/card/card';

const CardPageOnBackground = () => {
  const { id } = useParams();
  if (!id) {
    return;
  }
  const card = useCard(id);
  console.log(card);
  return card ? <Card card={card} /> : null;
};

export default CardPageOnBackground;
