import React from 'react';
import {
  Popover,
  Stack,
  Typography,
  Button,
  PopoverOrigin,
} from '@mui/material';

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

const DeleteItemPopover = (props: {
  anchorEl: null | HTMLElement;
  closeHandler: () => void;
  deleteHandler: () => void;
  anchorOrigin: PopoverOrigin;
  transformOrigin: PopoverOrigin;
  prompt: string;
}) => {
  const {
    anchorEl,
    closeHandler,
    deleteHandler,
    prompt,
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
      <Stack sx={styles.menuContent} spacing={2}>
        <Typography variant="h6">{prompt}</Typography>
        <Stack direction="row" justifyContent="end" spacing={2}>
          <Button onClick={closeHandler}>Cancel</Button>
          <Button variant="contained" onClick={deleteHandler}>
            Delete
          </Button>
        </Stack>
      </Stack>
    </Popover>
  );
};

export default DeleteItemPopover;
