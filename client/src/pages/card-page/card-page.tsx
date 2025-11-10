import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Paper, Grid, Stack, Box } from '@mui/material';
import CardDescription from '../../components/card-page-components/card-descriprion/card-descritpion';
import CardPageTitle from '../../components/card-page-components/card-page-styled-elements/card-title/card-title';
import CardActions from '../../components/card-page-components/card-actions/card-actions';
import CheckListSection from '../../components/card-page-components/checklist-section/checklist-section';
import CloseIcon from '@mui/icons-material/Close';
import { useFetchCardById } from '../../api/cards-api-queries';
import { useChecklistActions } from '../../services/checklist-store';
import { useChecklistItemActions } from '../../services/checklist-item-store';
import LoadingBage from '../../components/loading-bage/loading-bage';

const styles = {
  container: {
    p: 3,
    borderRadius: 2,
    flexGrow: 1,
  },
  closeButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  mainContainer: {
    mt: 2,
  },
  overflow: {
    minHeight: '512px',
    maxHeight: 'calc(100dvh - 256px)',
    overflowY: 'auto',
    overflowX: 'hidden',
    '--Grid-borderWidth': '1px',
    borderRight: 'var(--Grid-borderWidth) solid',
    borderColor: 'divider',
  },
  description: {
    width: '512px',
  },
  dividerTop: {
    '--Grid-borderWidth': '1px',
    borderTop: 'var(--Grid-borderWidth) solid',
    borderColor: 'divider',
  },
  extraPedding: {
    pb: 3,
  },
};

const CardPage = () => {
  const navigate = useNavigate();
  const { setChecklists } = useChecklistActions();
  const { setChecklistItems } = useChecklistItemActions();
  const { id, boardId } = useParams();
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

  return data ? (
    <Paper sx={styles.container}>
      <Grid container sx={styles.extraPedding}>
        <Grid container size={12}>
          <Stack
            flexGrow="1"
            justifyContent="space-between"
            flexDirection="row"
          >
            <CardPageTitle _id={data.card._id} name={data.card.name} />
            <Box
              onClick={() => navigate(`/boards/${boardId}`, { replace: true })}
              sx={styles.closeButton}
            >
              <CloseIcon fontSize="large" />
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <Grid container size={12} columns={18} sx={styles.dividerTop}>
        <Grid size={14} container columns={18} sx={styles.overflow}>
          <Grid size={18}>
            <CardDescription
              cardId={data.card._id}
              description={data.card.description}
            />
          </Grid>
          <Grid>
            <CheckListSection />
          </Grid>
        </Grid>
        <Grid size={4} container columns={12}>
          <CardActions cardId={data.card._id} />
        </Grid>
      </Grid>
    </Paper>
  ) : isLoading ? (
    <LoadingBage />
  ) : null;
};

export default CardPage;
