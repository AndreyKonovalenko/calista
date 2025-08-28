import React from 'react';
import { useParams, useNavigate } from 'react-router';
import {Paper, Stack, Box, Divider } from '@mui/material';
import CardDescription from '../../components/card-page-components/card-descriprion/card-descritpion';
import CardPageTitle from '../../components/card-page-components/card-title/card-title';
import CardActions from '../../components/card-page-components/card-actions/card-actions';
import CheckListSection from '../../components/card-page-components/checklist-section/checklist-section';
import { useCard } from '../../services/card-store';
import CloseIcon from '@mui/icons-material/Close';



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
   const { id } = useParams();
  const card = useCard(id);
  // const [addCheckList, setAddCheckList] = useState(false)
  // const handleAddChecklist = () =>{
  //   setAddCheckList(!addCheckList)
  // }

  return card ? (
    <Paper sx={styles.container}>
      <Stack direction="row" justifyContent="space-between">
        <CardPageTitle _id={card._id} name={card.name} />
        <Box onClick={() => navigate(-1)} sx={styles.closeButton}>
          <CloseIcon fontSize="large" />
        </Box>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={styles.mainContainer}
      >
        <Stack direction="column" spacing={5} sx={styles.description}>
          <CardDescription card={card} />
          <CheckListSection/>
        </Stack>
        <Divider orientation="vertical" variant="middle" flexItem />
        <CardActions cardId={card._id} />
      </Stack>
    </Paper>
  ) : null;
};

export default CardPage;
