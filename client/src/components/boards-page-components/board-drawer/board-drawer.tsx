import React, { useState } from 'react';
import {
  Drawer,
  styled,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Button,
  PopoverOrigin,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { drawerWidth } from '../../../layouts/config-layout';
import DeleteItemPopover from '../../general-components/delete-item-popover/delete-item-popover';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  justifyContent: 'flex-start',
  ...theme.mixins.toolbar,
}));

type TBoadDrawer = {
  open: boolean;
  handleDrawerClose: () => void;
  handleDeleteBoard: () => void;
};

const anchorOrigin: PopoverOrigin = {
  vertical: 'bottom',
  horizontal: 'center',
};

const transformOrigin: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'center',
};

const BoardDrawer = (props: TBoadDrawer): JSX.Element => {
  const { open, handleDrawerClose, handleDeleteBoard } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenDeleteMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handleCloseDeleteMenu = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            marginTop: '64px',
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              id="boardDeleteButton"
              component={Button}
              onClick={handleOpenDeleteMenu}
            >
              <ListItemIcon>
                <DeleteOutlineIcon />
              </ListItemIcon>
              <ListItemText primary={'delete board'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <DeleteItemPopover
        anchorEl={anchorEl}
        closeHandler={handleCloseDeleteMenu}
        deleteHandler={handleDeleteBoard}
        prompt="Are you sure you want to delete board?"
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      />
    </React.Fragment>
  );
};

export default BoardDrawer;
