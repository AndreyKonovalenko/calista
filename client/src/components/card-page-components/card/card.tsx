import React,{useCallback} from 'react';
import { useNavigate } from 'react-router';
import { Paper, Grid, Stack, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CardPageTitle from '../card-page-styled-elements/card-title/card-title';
import CardDescription from '../card-descriprion/card-descritpion';
import CheckListSection from '../checklist-section/checklist-section';
import CardActions from '../card-actions/card-actions';
import { ROUTES } from '../../../utils/router-paths';

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
    borderRight: { md: 'var(--Grid-borderWidth) solid', xs: 'none' },
    borderTop: { md: 'none', xs: 'var(--Grid-borderWidth) solid' },
    borderColor: { md: 'divider', xs: 'divider' },
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

const Card = (props: {
  _id: string;
  name: string;
  description: string | undefined;
  boardId: string;
}) => {
  const navigate = useNavigate();
  const { _id, boardId, description, name } = props;

  const handleClose = useCallback(() => {
  if (boardId) {
    navigate(ROUTES.board(boardId), { replace: true });
  }
}, [boardId, navigate]);

  return (
    <Paper sx={styles.container}>
      <Grid container sx={styles.extraPedding}>
        <Grid container size={12}>
          <Stack
            flexGrow="1"
            justifyContent="space-between"
            flexDirection="row"
          >
            <CardPageTitle _id={_id} name={name} />
            <Box
              onClick={handleClose}
              sx={styles.closeButton}
            >
              <CloseIcon fontSize="large" />
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <Grid container size={12} columns={18} sx={styles.dividerTop}>
        <Grid
          size={{ xs: 18, md: 14 }}
          order={{ xs: 2, md: 1 }}
          container
          columns={18}
          sx={styles.overflow}
        >
          <Grid size={18}>
            <CardDescription cardId={_id} description={description} />
          </Grid>
          <Grid size={18}>
            <CheckListSection cardId={_id} />
          </Grid>
        </Grid>
        <Grid
          size={{ xs: 18, md: 4 }}
          order={{ xs: 1, md: 2 }}
          container
          columns={12}
        >
          <CardActions cardId={_id} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Card;
