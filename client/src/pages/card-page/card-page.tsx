import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Typography, Paper } from '@mui/material';
import { invariantId } from '../../utils/utils';
import LoadingBage from '../../components/loading-bage/loading-bage';
import { useFetchCardById } from '../../api/cards-api-queries';
import { useCardStore } from '../../services/cards/card-store';

const CardPage = () => {
  const { id } = useParams();
  invariantId(id);
  const { setCardState, name } = useCardStore(state => state);
  const { data, isSuccess, isLoading } = useFetchCardById(id);

  useEffect(() => {
    if (isSuccess) setCardState(data);
  }, [data, isSuccess]);

  return isLoading ? (
    <LoadingBage />
  ) : (
    <Paper>
      <Typography variant="h2">{name}</Typography>
    </Paper>
  );
};

export default CardPage;
