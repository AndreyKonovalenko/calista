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
  Avatar,
} from '@mui/material';
// import Person from '@mui/icons-material/Person';
import Settings from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const styles = {
  title: {
    pl: 2,
    pr: 2,
    pt: 1,
    pb: 1,
  },
  menuContent: {
    width: '300px',
    m: 1,
  },
  personData: {
    pl: 2,
    pr: 2,
    pt: 1,
    pb: 2,
    display: 'flex',
    gap: 2,
    flexDirection: 'row',
    justifyContent: 'start',
  },
};

const AccountMenu = (props: {
  anchorEl: null | HTMLElement;
  closeHandler: () => void;
  handleLogout: () => void;
  anchorOrigin: PopoverOrigin;
  transformOrigin: PopoverOrigin;
  username: string;
  email: string;
}) => {
  const {
    anchorEl,
    closeHandler,
    anchorOrigin,
    transformOrigin,
    handleLogout,
    username,
    email,
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
        <Box sx={styles.title}>
          <Typography variant="body2">ACCOUNT</Typography>
        </Box>

        <Stack sx={styles.personData}>
          <Avatar />
          <Box>
            <Typography>
              {username}
              {email}
            </Typography>
            <Typography>{email}</Typography>
          </Box>
        </Stack>
        <Divider />
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </MenuList>
      </Box>
    </Menu>
  );
};

export default AccountMenu;
