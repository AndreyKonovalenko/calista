import React,{useEffect} from 'react';
import { useParams } from 'react-router';
import { useCard } from '../../services/card-store';
import Card from '../../components/card-page-components/card/card';
import { debugLog } from '../../utils/debug';

const CardPageOnBackground = () => {
  debugLog('')
  const { cardId } = useParams();
  if (!cardId) {
    return;
  }
  const card = useCard(cardId);
  if (!card) {
    return;
  }
  const { _id, boardId, description, name } = card;

  useEffect(()=>{
    debugLog('card-page-on-backgroung')
  },[])
  return card ? (
    <Card _id={_id} boardId={boardId} name={name} description={description} />
  ) : null;
};

export default CardPageOnBackground;
