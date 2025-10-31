import React from 'react';
import {
  Menu,
  Typography,
  Button,
  PopoverOrigin,
  IconButton,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const styles = {
  menu: {
    zIndex: 10000,
  },
};

const ChecklistItemActionsMenu = (props: {
  anchorEl: null | HTMLElement;
  closeHandler: () => void;
  deleteHandler: () => void;
  anchorOrigin: PopoverOrigin;
  transformOrigin: PopoverOrigin;
}) => {
  const {
    anchorEl,
    closeHandler,
    deleteHandler,
    anchorOrigin,
    transformOrigin,
  } = props;
  const open = Boolean(anchorEl);
  return (
    <Menu
      sx={styles.menu}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      anchorEl={anchorEl}
      open={open}
      onClose={closeHandler}
    >
      <Grid container columns={16} spacing={2}>
        <Grid container size={16} columns={16}>
          <Grid size={3} />
          <Grid size={10} display="flex" justifyContent="center">
            <Typography variant="h6">Item actions</Typography>
          </Grid>
          <Grid size={3}>
            <IconButton color="inherit" onClick={closeHandler}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          size={16}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button variant="contained" onClick={deleteHandler}>
            Delete
          </Button>
        </Grid>
      </Grid>
    </Menu>
  );
};

export default ChecklistItemActionsMenu;
