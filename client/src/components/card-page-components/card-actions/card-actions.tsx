import React, { useState } from 'react';
import {
  Stack,
  Button,
  Typography,
  Divider,
  PopoverOrigin,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDeleteCard } from '../../../api/cards-api-queries';
import { useNavigate } from 'react-router';
import DeleteItemMenu from '../delete-item-menu/delete-item-menu';
import AddChecklistMenu from '../add-checklist-menu/add-checklist-menu';

const styles = {
  actions: {
    width: '168px',
  },
  extraPadding: {
    pb: 1,
  },
};
const anchorOrigin: PopoverOrigin = {
  vertical: 'center',
  horizontal: 'center',
};
const transformOrigin: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'center',
};

const CardActions = (props: { cardId: string }) => {
  const { cardId } = props;
  const navigate = useNavigate();
  const deleteCardQuery = useDeleteCard();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorSecondEl, setAnchorSecondEl] = useState<null | HTMLElement>(
    null,
  );

  const handleOpenDeleteMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenAddChecklistMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorSecondEl(event.currentTarget);
  };
  const handleCloseDeleteMenu = () => {
    setAnchorEl(null);
  };

  const handleCloseAddChecklistMenu = () => {
    setAnchorSecondEl(null);
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
      <Button onClick={handleOpenAddChecklistMenu}>ADD CHECKLIST</Button>
      <Button onClick={handleOpenDeleteMenu}>DELETE CARD</Button>
      <DeleteItemMenu
        anchorEl={anchorEl}
        closeHandler={handleCloseDeleteMenu}
        deleteHandler={handleDeleteCard}
        prompt="Are you sure you wont to delete this card?"
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      />
      <AddChecklistMenu
        anchorEl={anchorSecondEl}
        closeAddChecklistMenu={handleCloseAddChecklistMenu}
      />
    </Stack>
  );
};

export default CardActions;
