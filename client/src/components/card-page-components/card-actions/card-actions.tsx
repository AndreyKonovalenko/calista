import React, { useState } from 'react';
import { Stack, Button, Typography, Menu, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDeleteCard } from '../../../api/cards-api-queries';
import { useNavigate } from 'react-router';
import { useUIActions } from '../../../services/ui-store';

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
  extraPadding: {
    pb: 1,
  },
};

const CardActions = (props: { cardId: string }) => {
  const { cardId } = props;
  const navigate = useNavigate();
  const deleteCardQuery = useDeleteCard();
  const { setAddChecklist } = useUIActions();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenDeleteMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDeleteMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteCard = () => {
    if (!cardId) return;
    deleteCardQuery.mutate(cardId);
    navigate(-1);
  };

  return (
    <Stack sx={styles.actions}>
      <Stack direction="row" spacing={1} sx={styles.extraPadding}>
        <Stack direction="column" justifyContent="center">
          <MenuIcon fontSize="small" />
        </Stack>
        <Typography variant="h6">Actions</Typography>
      </Stack>
      <Divider orientation="horizontal" variant="middle" flexItem />
      <Button onClick={setAddChecklist}>ADD CHECKLIST</Button>
      <Button onClick={handleOpenDeleteMenu}>DELETE CARD</Button>
      <Menu
        sx={styles.menu}
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseDeleteMenu}
      >
        <Stack sx={styles.menuContent} spacing={2}>
          <Typography variant="h6">
            Are you sure you wont to delete this card?
          </Typography>
          <Stack direction="row" justifyContent="end" spacing={2}>
            <Button onClick={handleCloseDeleteMenu}>Cancel</Button>
            <Button variant="contained" onClick={handleDeleteCard}>
              Delete
            </Button>
          </Stack>
        </Stack>
      </Menu>
    </Stack>
  );
};

export default CardActions;
