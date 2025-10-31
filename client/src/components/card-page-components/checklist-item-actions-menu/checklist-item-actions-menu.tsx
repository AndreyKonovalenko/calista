import React from 'react';
import {
  Menu,
  Stack,
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
  menuContent: {
    pt: 1,
    pb: 1,
    pl: 2,
    pr: 2,
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
      <Stack sx={styles.menuContent} spacing={2}>
        <Grid container columns={12}>
          <Grid size={1} />
          <Grid>
            <Typography variant="h6">Item actions</Typography>
          </Grid>
          <Grid size={1}>
            <IconButton color="inherit" onClick={closeHandler}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
        <Button variant="contained" onClick={deleteHandler}>
          Delete
        </Button>
      </Stack>
    </Menu>
  );
};

export default ChecklistItemActionsMenu;
