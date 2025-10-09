import React from 'react';
import { Menu, Stack, Typography, Button, PopoverOrigin } from '@mui/material';

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

const anchorOrigin: PopoverOrigin = {
    vertical: 'center',
    horizontal: 'center'
}
const transformOrigin: PopoverOrigin = {
    vertical: 'top',
    horizontal: 'center',
}


const DeleteCardMenu = (props: {
  anchorEl: null | HTMLElement;
  closeDeleteMenu: () => void;
  deleteCard: () => void;
}) => {
  const { anchorEl, closeDeleteMenu, deleteCard } = props;
  const open = Boolean(anchorEl);
  return (
    <Menu
      sx={styles.menu}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      anchorEl={anchorEl}
      open={open}
      onClose={closeDeleteMenu}
    >
      <Stack sx={styles.menuContent} spacing={2}>
        <Typography variant="h6">
          Are you sure you wont to delete this card?
        </Typography>
        <Stack direction="row" justifyContent="end" spacing={2}>
          <Button onClick={closeDeleteMenu}>Cancel</Button>
          <Button variant="contained" onClick={deleteCard}>
            Delete
          </Button>
        </Stack>
      </Stack>
    </Menu>
  );
};

export default DeleteCardMenu;
