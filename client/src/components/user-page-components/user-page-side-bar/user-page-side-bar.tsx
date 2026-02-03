import React from 'react';
import { MenuItem, Box, MenuList } from '@mui/material';
import { NavLink as RoutLink, useLocation } from 'react-router';
import { TO_USER } from '../../../utils/route-constants';

const UserPageSideBar = function UserPageSideBar() {
  const location = useLocation();
  console.log(location);
  return (
    <Box sx={{ p: 2 }}>
      <MenuList>
        <MenuItem
          component={RoutLink}
          selected={location.pathname === `${TO_USER}/profile` ? true : false}
          to={`${TO_USER}/profile`}
        >
          Profile
        </MenuItem>
        <MenuItem
          component={RoutLink}
          selected={location.pathname === `${TO_USER}/email` ? true : false}
          to={`${TO_USER}/email`}
        >
          Email
        </MenuItem>
        <MenuItem
          component={RoutLink}
          selected={location.pathname === `${TO_USER}/security` ? true : false}
          to={`${TO_USER}/security`}
        >
          Security & Privacy
        </MenuItem>
        <MenuItem
          component={RoutLink}
          selected={location.pathname === `${TO_USER}/account` ? true : false}
          to={`${TO_USER}/account`}
        >
          Account
        </MenuItem>
      </MenuList>
    </Box>
  );
};
export default UserPageSideBar;
