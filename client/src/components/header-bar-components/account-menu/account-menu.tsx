
import React from 'react';
import {
  PopoverOrigin,
  MenuList,
  MenuItem,
  ListItemIcon,
  Divider,
  Typography,
  Menu,
  Box,
  Stack,
  Avatar
} from '@mui/material';
// import Person from '@mui/icons-material/Person';
import Settings from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';


const styles = {
  menuContent: {
    width: '300px'
  },
};

const AccountMenu = (props: {
  anchorEl: null | HTMLElement;
  closeHandler: () => void;
  handleLogout: ()=> void;
  anchorOrigin: PopoverOrigin;
  transformOrigin: PopoverOrigin;
  username: string
}) => {
  const {
    anchorEl,
    closeHandler,
    anchorOrigin,
    transformOrigin,
    handleLogout,
    username
  } = props;
  const open = Boolean(anchorEl);
  return (
      <Menu
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        anchorEl={anchorEl}
        open={open}
        onClose={closeHandler}
      > 
      <Box sx={styles.menuContent}>

        <Box sx={{pl:2, pr:2}}>
          <Typography variant="body2">ACCOUNT</Typography>
          <Stack direction='row'>
            <Avatar/>
            <Typography>
              {username}
            </Typography>
          </Stack>
          
        </Box>
        <Divider/>
        <MenuList>
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
      </Box>
      </Menu>
  );
};


export default AccountMenu