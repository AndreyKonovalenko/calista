import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Paper, Grid, Divider } from '@mui/material';
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
  },
  description: {
    width: '512px',
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
  // const [addCheckList, setAddCheckList] = useState(false)
  // const handleAddChecklist = () =>{
  //   setAddCheckList(!addCheckList)
  // }

  useEffect(() => {
    if (isSuccess) {
      setChecklists(data.checklists);
      setChecklistItems(data.checklistItems);
    }
  }, [isSuccess, data]);

  return data ? (
    <Paper sx={styles.container}>
      <Grid container>
        <Grid container size={12}>
          <Grid size={10}>
            <CardPageTitle _id={data.card._id} name={data.card.name} />
          </Grid>
          <Grid
            size={2}
            onClick={() => navigate(`/boards/${boardId}`, { replace: true })}
            sx={styles.closeButton}
          >
            <CloseIcon fontSize="large" />
          </Grid>
        </Grid>
        <Grid container size={12} columns={18}>
          <Grid size={14} container sx={styles.overflow}>
            <Grid>
              <CardDescription
                cardId={data.card._id}
                description={data.card.description}
              />
            </Grid>
            <Grid>
              <CheckListSection />
            </Grid>
          </Grid>
          <Grid size={1} display="flex" justifyContent="center">
            <Divider orientation="vertical" variant="middle" flexItem />
          </Grid>
          <Grid size={3}>
            <CardActions cardId={data.card._id} />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  ) : isLoading ? (
    <LoadingBage />
  ) : null;
};

export default CardPage;
