import React, { useState } from 'react';
import { useCardActions } from '../../../services/card-store';
import { useUpdateCard } from '../../../api/cards-api-queries';
import { Stack, TextField, Button, Typography, Box, Grid } from '@mui/material';
import NotesIcon from '@mui/icons-material/Notes';

const styles = {
  closeButton: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  description: {
    width: '100%',
  },
  descriptionCustomButton: {
    textTransform: 'none',
    justifyContent: 'start',
  },
  emptyBox: {
    width: '20px'
  }
};
const descriptionPlaceholder = 'Add a more detailed descripion...';

const CardDescription = (props: {
  cardId: string;
  description: string | undefined;
}) => {
  const { updateCardDescription } = useCardActions();
  const { mutate: updateCardMutate } = useUpdateCard();
  const { description, cardId } = props;
  const [descripionEdit, setDescriptionEdit] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState(description);

  const handleDesctiptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescriptionValue(event.target.value);
  };
  const handleDesctiptionCancle = () => {
    setDescriptionEdit(false);
  };

  const handleSetDescriptionEdit = () => {
    setDescriptionEdit(true);
  };

  const handleUpdateDescription = (
    event: React.FormEvent<HTMLFormElement>,
    id: string | undefined,
  ) => {
    event.preventDefault();
    if (!id) return;
    const formData = new FormData(event.currentTarget);
    const newDescription = formData.get('description') as string;
    if (newDescription && newDescription !== description) {
      updateCardMutate({
        id: id,
        data: { description: newDescription },
      });
      updateCardDescription(cardId, newDescription);
    }
  };

  return (
    <Box>
      <Grid container spacing={0.5} columns={18}>
        <Grid size={1} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'start'}}>
          <NotesIcon fontSize="small" />
        </Grid>
        <Grid size={17}>
          <Typography variant="h6">Description</Typography>
        </Grid>      
           {/* {!descripionEdit && description ? (
          <Button variant="text" onClick={handleSetDescriptionEdit}>
            EDIT
          </Button>
        ) : null} */}
      </Grid>
      {descripionEdit ? (
        <Stack direction='row' spacing={1}>
          <Box sx={styles.emptyBox}/>
          <Stack
            direction="column"
            spacing={1}
            sx={styles.description}
            component="form"
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              handleUpdateDescription(event, cardId);
              setDescriptionEdit(false);
            }}
          >
            <TextField
              fullWidth
              rows={4}
              multiline={true}
              name="description"
              onChange={handleDesctiptionChange}
              value={descriptionValue}
              placeholder={descriptionPlaceholder}
            />
            <Stack direction="row" justifyContent="start" spacing={1}>
              <Button variant="contained" type="submit">
                SAVE
              </Button>
              <Button variant="outlined" onClick={handleDesctiptionCancle}>
                CANCLE
              </Button>
            </Stack>
          </Stack>
        </Stack>
      ) : description ? (
        <Stack direction='row' spacing={1}>
          <Box sx={styles.emptyBox}/>
          <Typography>{description}</Typography>
        </Stack>
      ) : (
        <Button
          variant="outlined"
          fullWidth
          onClick={handleSetDescriptionEdit}
          sx={styles.descriptionCustomButton}
        >
          {descriptionPlaceholder}
        </Button>
      )}
    </Box>
  );
};

export default CardDescription;
