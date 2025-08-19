import React from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  Typography,
  Paper,
  Stack,
  Box,
  Button,
  Divider
} from '@mui/material';
import CardDescription from '../../components/card-page-components/card-descriprion/card-descritpion';
import { useDeleteCard } from '../../api/cards-api-queries';
import { useCard } from '../../services/card-store';
import CloseIcon from '@mui/icons-material/Close';
// import { useUpdateCard } from '../../api/cards-api-queries';
// const descriptionPlaceholder = 'Add a more detailed descripion...';
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
  const { id } = useParams();
  const card = useCard(id);

  const handleDeleteCard = (cardId: string | undefined) => {
    if (!cardId) return;
    deleteCardQuery.mutate(cardId);
    navigate(-1);
  };

  return card ? (
    <Paper sx={styles.container}>
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
        <Stack direction="column" spacing={1} sx={styles.description}>
          <CardDescription card={card} />
          <Typography variant="h6">Check list placeholder</Typography>
        </Stack>
        <Divider orientation='vertical' variant='middle' flexItem/>
        <Stack sx={styles.actions}>
          <Typography variant="h6">Actions:</Typography>
          <Button fullWidth={true} onClick={() => handleDeleteCard(id)}>
            DELETE CARD
          </Button>
        </Stack>
      </Stack>
    </Paper>
  ) : null;
};

export default CardPage;
