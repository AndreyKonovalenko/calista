import React, { useState } from 'react';
import { useCardActions } from '../../../services/card-store';
import { useUpdateCard } from '../../../api/cards-api-queries';
import { Stack, TextField, Button, Typography, Grid } from '@mui/material';
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
    <Grid container rowSpacing={1} columns={18}>
      <Grid container size={18} columns={18} rowSpacing={1}>
        <Grid
          size={1}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <NotesIcon fontSize="small" />
        </Grid>
        <Grid size={17}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Description</Typography>
            {!descripionEdit && description ? (
              <Button variant="text" onClick={handleSetDescriptionEdit}>
                EDIT
              </Button>
            ) : null}
          </Stack>
        </Grid>
      </Grid>
      {descripionEdit ? (
        <Grid
          container
          size={18}
          columns={18}
          rowSpacing={1}
          component="form"
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            handleUpdateDescription(event, cardId);
            setDescriptionEdit(false);
          }}
        >
          <Grid size={1} />
          <Grid size={17}>
            <TextField
              fullWidth
              rows={4}
              multiline={true}
              name="description"
              onChange={handleDesctiptionChange}
              value={descriptionValue}
              placeholder={descriptionPlaceholder}
            />
          </Grid>
          <Grid size={1} />
          <Grid size={17}>
            <Stack direction="row" justifyContent="start" spacing={1}>
              <Button variant="contained" type="submit">
                SAVE
              </Button>
              <Button variant="outlined" onClick={handleDesctiptionCancle}>
                CANCLE
              </Button>
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <Grid size={18} container columns={18}>
          <Grid size={1} />
          <Grid size={17}>
            {description ? (
              <Typography>{description}</Typography>
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
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default CardDescription;
