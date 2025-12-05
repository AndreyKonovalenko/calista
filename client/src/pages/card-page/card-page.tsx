import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useFetchCardById } from '../../api/cards-api-queries';
import { useChecklistActions } from '../../services/checklist-store';
import { useChecklistItemActions } from '../../services/checklist-item-store';
import LoadingBage from '../../components/loading-bage/loading-bage';
import Card from '../../components/card-page-components/card/card';

const CardPage = () => {
  const { setChecklists } = useChecklistActions();
  const { setChecklistItems } = useChecklistItemActions();
  const { id } = useParams();
  console.log(id);
  if (!id) {
    return null;
  }
  const { data, isSuccess, isLoading } = useFetchCardById(id);

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess) {
      setChecklists(data.checklists);
      setChecklistItems(data.checklistItems);
    }
  }, [isSuccess, data]);

  return data ? <Card card={data.card} /> : isLoading ? <LoadingBage /> : null;
};

export default CardPage;
