import React, { useState } from 'react';
import { ICard } from '../../../utils/types';
import { useCardActions } from '../../../services/card-store';
import { useUpdateCard } from '../../../api/cards-api-queries';
import { Stack, TextField, Button, Typography } from '@mui/material';
import NotesIcon from '@mui/icons-material/Notes';

const styles = {
  closeButton: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  description: {
    width: '512px',
  },
  descriptionCustomButton: {
    textTransform: 'none',
    justifyContent: 'start',
  },
};
const descriptionPlaceholder = 'Add a more detailed descripion...';

const CardDescription = (props: { card: ICard }) => {
  const { updateCardDescription } = useCardActions();
  const { mutate: updateCardMutate } = useUpdateCard();
  const { description, _id } = props.card;
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
      updateCardDescription(_id, newDescription);
    }
  };

  return (
    <Stack direction='column' justifyContent='start' spacing={1}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={1}>
          <Stack direction="column" justifyContent="center">
            <NotesIcon fontSize="small" />
          </Stack>
          <Typography variant="h6">Description</Typography>
        </Stack>

        {!descripionEdit && description ? (
          <Button variant="text" onClick={handleSetDescriptionEdit}>
            EDIT
          </Button>
        ) : null}
      </Stack>
      {descripionEdit ? (
        <Stack
          direction="column"
          spacing={1}
          component="form"
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            handleUpdateDescription(event, _id);
            setDescriptionEdit(false);
          }}
        >
          <TextField
            fullWidth
            rows={8}
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
      ) : description ? (
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
    </Stack>
  );
};

export default CardDescription;
