import React from 'react';
import { useNavigate } from 'react-router';
import { Paper, Grid, Stack, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CardPageTitle from '../card-page-styled-elements/card-title/card-title';
import CardDescription from '../card-descriprion/card-descritpion';
import CheckListSection from '../checklist-section/checklist-section';
import CardActions from '../card-actions/card-actions';
import { ICard } from '../../../utils/types';

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
    minHeight: '256px',
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

const Card = (props: { card: ICard }) => {
  const navigate = useNavigate();
  const { card } = props;

  return (
    <Paper sx={styles.container}>
      <Grid container sx={styles.extraPedding}>
        <Grid container size={12}>
          <Stack
            flexGrow="1"
            justifyContent="space-between"
            flexDirection="row"
          >
            <CardPageTitle _id={card._id} name={card.name} />
            <Box
              onClick={() =>
                navigate(`/boards/${card.boardId}`, { replace: true })
              }
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
            <CardDescription cardId={card._id} description={card.description} />
          </Grid>
          <Grid size={18}>
            <CheckListSection cardId={card._id} />
          </Grid>
        </Grid>
        <Grid size={4} container columns={12}>
          <CardActions cardId={card._id} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Card;
