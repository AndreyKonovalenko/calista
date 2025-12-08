import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Navigate } from 'react-router';
import { useFetchCardById } from '../../api/cards-api-queries';
import { useChecklistActions } from '../../services/checklist-store';
import { useChecklistItemActions } from '../../services/checklist-item-store';
import LoadingBage from '../../components/loading-bage/loading-bage';
import Card from '../../components/card-page-components/card/card';
import { TO_MAIN } from '../../utils/route-constants';

const CardPage = () => {
  const { setChecklists } = useChecklistActions();
  const { setChecklistItems } = useChecklistItemActions();
  const { id } = useParams();
  if (!id) {
    return null;
  }
  const { data, isSuccess, isLoading } = useFetchCardById(id);

  useEffect(() => {
    if (isSuccess) {
      setChecklists(data.checklists);
      setChecklistItems(data.checklistItems);
    }
  }, [isSuccess, data]);

  if (isSuccess && !data.card) {
    return <Navigate to={TO_MAIN} />;
  }
  return isSuccess && data.card ? (
    <Card
      _id={data.card._id}
      boardId={data.card.boardId}
      name={data.card.name}
      description={data.card.description}
    />
  ) : isLoading ? (
    <LoadingBage />
  ) : null;
};

export default CardPage;
