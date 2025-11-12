import React from 'react';
import {
  Typography,
  Button,
  PopoverOrigin,
  IconButton,
  Grid,
  Divider,
  Popover,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const styles = {
  menu: {
    zIndex: 10000,
  },
  divider: {
    width: '80%',
  },
  container: {
    pt: 2,
    pb: 2,
  },
};
const ChecklistItemActionsPopover = (props: {
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
    <Popover
      sx={styles.menu}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      anchorEl={anchorEl}
      open={open}
      onClose={closeHandler}
    >
      <Grid container columns={12} rowGap={4} sx={styles.container}>
        <Grid container size={12}>
          <Grid size={2} />
          <Grid
            size={8}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h6">Item actions</Typography>
          </Grid>
          <Grid size={2} display="flex" justifyContent="flex-end">
            <IconButton color="inherit" onClick={closeHandler}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Grid>
          <Grid size={12} display="flex" justifyContent="center">
            <Divider sx={styles.divider} />
          </Grid>
        </Grid>
        <Grid
          size={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button variant="contained" onClick={deleteHandler}>
            Delete
          </Button>
        </Grid>
      </Grid>
    </Popover>
  );
};

export default ChecklistItemActionsPopover;
