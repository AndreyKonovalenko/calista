import React, {useState} from 'react';
import { useParams, useNavigate } from 'react-router';
import { Typography, Paper, Stack, Box, Button, TextField} from '@mui/material';
import { useDeleteCard } from '../../api/cards-api-queries';
import { useCard, useCardActions } from '../../services/card-store';
import CloseIcon from '@mui/icons-material/Close';
import { useUpdateCard } from '../../api/cards-api-queries';
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
  actions: {
    width: '168px',
  },
};

const CardPage = () => {
  const navigate = useNavigate();
  const deleteCardQuery = useDeleteCard();
  const { updateCardDescription } = useCardActions()
  const {mutate:updateCardMutate} = useUpdateCard();
  const { id } = useParams();
  const card = useCard(id);
  const [descriptionValue, setDescriptionValue] = useState(card?.description)

  const handleDeleteCard = (cardId: string | undefined) => {
    if(!cardId) return
    deleteCardQuery.mutate(cardId);
    navigate(-1);
  };

  const handleDeisctiptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionValue(event.target.value);
  }
  const handleDeisctiptionCancle = () => {
    setDescriptionValue('')
  }

  const handleUpdateDescription = (
      event: React.FormEvent<HTMLFormElement>,
      id: string | undefined,
    ) => {
      event.preventDefault();
      if(!id) return
      const formData = new FormData(event.currentTarget);
      const newDescription = formData.get('description') as string;
      if (newDescription && newDescription !== card?.description ) {
        updateCardMutate({
          id: id,
          data: { description: newDescription },
        });
        updateCardDescription(id, newDescription)
      }
    };


  return  card ? 
    (<Paper sx={styles.container}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4">{card.name}</Typography>
        <Box onClick={() => navigate(-1)} sx={styles.closeButton}>
          <CloseIcon fontSize="large" />
        </Box>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={styles.mainContainer}
      >
        <Stack direction='column' spacing={1} sx={styles.description}>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Typography variant="h6">Description:</Typography>
            <Button variant='text'>EDIT</Button>
          </Stack>
          <Stack
            direction='column'
            spacing={1}
            component='form'
            onSubmit={(event: React.FormEvent<HTMLFormElement>)=> handleUpdateDescription(event, id)}
          >
            <TextField
              fullWidth
              rows={8}
              multiline={true}
              name='description'
              onChange={handleDeisctiptionChange}
              value={descriptionValue}
              placeholder="Add a more detailed descripion..."
            />  
            <Stack direction='row' justifyContent="start" spacing={1}>
              <Button variant='contained' type='submit'>SAVE</Button>
              <Button variant='outlined' onClick={handleDeisctiptionCancle}>CANCLE</Button>
            </Stack>
          </Stack>
          <Typography variant="h6">Check list placeholder</Typography>
        </Stack>
        <Stack sx={styles.actions}>
          <Typography variant="h6">Actions:</Typography>
          <Button fullWidth={true} onClick={() => handleDeleteCard(id)}>
            DELETE CARD
          </Button>
        </Stack>
      </Stack>
    </Paper>
  ): null;
};

export default CardPage;
