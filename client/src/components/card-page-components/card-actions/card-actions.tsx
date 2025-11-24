import React, { useState } from 'react';
import { Grid, Button, Typography, Stack, PopoverOrigin } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDeleteCard } from '../../../api/cards-api-queries';
import { useNavigate } from 'react-router';
import DeleteItemPopover from '../../general-components/delete-item-popover/delete-item-popover';
import AddChecklistPopover from './add-checklist-popoever/add-checklist-popover';

const styles = {
  buttons: {
    display: 'flex',
    justifyContent: 'left',
  },
  dividerTop: {
    '--Grid-borderWidth': '1px',
    borderTop: 'var(--Grid-borderWidth) solid',
    borderColor: 'divider',
    pl: 1,
    pr: 1,
    pt: 0.5,
    pb: 0.5,
  },
  contentPadding: {
    pl: 1,
    pr: 1,
    pt: 0.5,
    pb: 0.5,
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
    <Grid size={12}>
      <Grid container size={12} sx={styles.contentPadding}>
        <Grid
          size={2}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <MenuIcon fontSize="small" />
        </Grid>
        <Grid size={10}>
          <Typography variant="h6">Actions</Typography>
        </Grid>
      </Grid>
      <Grid container size={12} sx={styles.dividerTop}>
        <Stack flexGrow="1">
          <Button onClick={handleOpenAddChecklistMenu} sx={styles.buttons}>
            ADD CHECKLIST
          </Button>
          <Button onClick={handleOpenDeleteMenu} sx={styles.buttons}>
            DELETE CARD
          </Button>
          <DeleteItemPopover
            anchorEl={anchorEl}
            closeHandler={handleCloseDeleteMenu}
            deleteHandler={handleDeleteCard}
            prompt="Are you sure you want to delete this card?"
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
          />
          <AddChecklistPopover
            anchorEl={anchorSecondEl}
            closeAddChecklistMenu={handleCloseAddChecklistMenu}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CardActions;
