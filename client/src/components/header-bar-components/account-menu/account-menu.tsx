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
import Settings from '@mui/icons-material/Settings';
import { Link as RouterLink } from 'react-router';
import LogoutIcon from '@mui/icons-material/Logout';
import { TO_LOGIN, TO_USER } from '../../../utils/route-constants';

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
  avatarConteiner: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
};

const AccountMenu = (props: {
  anchorEl: null | HTMLElement;
  closeHandler: () => void;
  handleLogout: () => void;
  handleToSettings: () => void;
  anchorOrigin: PopoverOrigin;
  transformOrigin: PopoverOrigin;
  username: string;
  email: string;
  userId: string;
}) => {
  const {
    anchorEl,
    closeHandler,
    anchorOrigin,
    transformOrigin,
    handleLogout,
    handleToSettings,
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
          <Box sx={styles.avatarConteiner}>
            <Avatar />
          </Box>
          <Box>
            <Typography>{username}</Typography>
            <Typography>{email}</Typography>
          </Box>
        </Stack>
        <Divider />
        <MenuList>
          <MenuItem
            to={`${TO_USER}/account`}
            component={RouterLink}
            onClick={handleToSettings}
          >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem to={TO_LOGIN} component={RouterLink} onClick={handleLogout}>
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
