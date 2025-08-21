import React, { useState } from 'react';
import { Stack, Button, Typography, Menu } from '@mui/material';
import { useDeleteCard } from '../../../api/cards-api-queries';
import { useNavigate } from 'react-router';

const styles = {
  actions: {
    width: '168px',
  },
  menu: {
    zIndex: 10000,
  },
  menuContent: {
    pt: 1,
    pb: 1,
    pl: 2,
    pr: 2,
  },
};

const CardActions = (props: { cardId: string }) => {
  const { cardId } = props;
  const navigate = useNavigate();
  const deleteCardQuery = useDeleteCard();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenDeleteMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDeleteMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteCard = (cardId: string | undefined) => {
    if (!cardId) return;
    deleteCardQuery.mutate(cardId);
    navigate(-1);
  };

  return (
    <Stack sx={styles.actions}>
      <Typography variant="h6">Actions:</Typography>
      <Button fullWidth={true} onClick={() => {}}>
        ADD CHECKLIST
      </Button>
      <Button fullWidth={true} onClick={handleOpenDeleteMenu}>
        DELETE CARD
      </Button>
      <Menu
        sx={styles.menu}
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseDeleteMenu}
      >
        <Stack sx={styles.menuContent} spacing={2}>
          <Typography>Are you sure you wont to delete this card?</Typography>
          <Stack direction="row" justifyContent="end" spacing={2}>
            <Button onClick={handleCloseDeleteMenu}>Cancel</Button>
            <Button
              variant="contained"
              onClick={() => handleDeleteCard(cardId)}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Menu>
    </Stack>
  );
};

export default CardActions;
