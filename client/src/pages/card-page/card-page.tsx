import React, { useEffect } from 'react';
import { useParams, useNavigate} from 'react-router';
import { Paper, Stack, Box, Divider } from '@mui/material';
import CardDescription from '../../components/card-page-components/card-descriprion/card-descritpion';
import CardPageTitle from '../../components/card-page-components/card-title/card-title';
import CardActions from '../../components/card-page-components/card-actions/card-actions';
import CheckListSection from '../../components/card-page-components/checklist-section/checklist-section';
import CloseIcon from '@mui/icons-material/Close';
import { useFetchCardById } from '../../api/cards-api-queries';
import { useChecklistActions } from '../../services/checklist-store';
import { useChecklistItemActions } from '../../services/checklist-item-store';
import LoadingBage from '../../components/loading-bage/loading-bage';

const styles = {
  container: {
    width: '768px',
    p: 2,
    borderRadius: 2,
  },
  closeButton: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  mainContainer: {
    mt: 2,
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
  const { data,  isLoading } = useFetchCardById(id);
  // const [addCheckList, setAddCheckList] = useState(false)
  // const handleAddChecklist = () =>{
  //   setAddCheckList(!addCheckList)
  // }

  console.log(data, isLoading);

  useEffect(() => {
    if (data) {
      setChecklists(data.checklists);
      setChecklistItems(data.checklistItems);
    }
  }, [data]);

  return data ? (
    <Paper sx={styles.container}>
      <Stack direction="row" justifyContent="space-between">
        <CardPageTitle _id={data.card._id} name={data.card.name} />
        <Box onClick={() => navigate(`/boards/${boardId}`,{replace:true})} sx={styles.closeButton}>
          <CloseIcon fontSize="large" />
        </Box>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={styles.mainContainer}
      >
        <Stack direction="column" spacing={5} sx={styles.description}>
          <CardDescription card={data.card} />
          <CheckListSection cardId={data.card._id} boardId={data.card.boardId} listId={data.card.listId}/>
        </Stack>
        <Divider orientation="vertical" variant="middle" flexItem />
        <CardActions cardId={data.card._id} />
      </Stack>
    </Paper>
  ) : (isLoading? <LoadingBage/>: null);
};

export default CardPage;
