
import React from 'react';
import {
  Menu,
  PopoverOrigin,
  MenuList,
  MenuItem,
  ListItemIcon
} from '@mui/material';
import Person from '@mui/icons-material/Person';
import Settings from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

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

const AccountMenu = (props: {
  anchorEl: null | HTMLElement;
  closeHandler: () => void;
  handleLogout: ()=> void;
  anchorOrigin: PopoverOrigin;
  transformOrigin: PopoverOrigin;
}) => {
  const {
    anchorEl,
    closeHandler,
    anchorOrigin,
    transformOrigin,
    handleLogout
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
      <MenuList>
        <MenuItem>
         <ListItemIcon>
            <Person fontSize="small"/>
          </ListItemIcon>
          Manage account</MenuItem>
        <MenuItem>
           <ListItemIcon>
            <Settings fontSize="small"/>
          </ListItemIcon>
          Settings</MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
              <LogoutIcon fontSize="small"/>
          </ListItemIcon>
        Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};


export default AccountMenu