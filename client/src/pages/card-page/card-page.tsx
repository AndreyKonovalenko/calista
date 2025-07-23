import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { Typography, Paper, Stack, Box, Button } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import { useDeleteCard } from '../../api/cards-api-queries';
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
    overflowY: 'scroll',
  },
  actions: {
    width: '168px',
  },
};

const CardPage = () => {
  const navigate = useNavigate();
  const deleteCardQuery = useDeleteCard();
  const { id } = useParams();
  if (!id) return null;
  const card = useCard(id);
  if (!card) return null;
  const { name } = card;
  const handleDeleteCard = (cardId: string) => {
    deleteCardQuery.mutate(cardId);
    navigate(-1);
  };

  return (
    <Paper sx={styles.container}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4">{name}</Typography>
        <Box onClick={() => navigate(-1)} sx={styles.closeButton}>
          <CloseIcon fontSize="large" />
        </Box>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={styles.mainContainer}
      >
        <Stack sx={styles.description}>
          <Typography variant="h6">Description</Typography>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={6}
            placeholder="Add a more detailed descripion..."
            style={{ width: '100%', maxWidth:"100%" }}
          />
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
  );
};

export default CardPage;
