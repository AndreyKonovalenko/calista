import React, {memo}  from "react";
import { MenuItem, Box, MenuList } from "@mui/material";
import { Link as RoutLink } from "react-router";
import { TO_USER } from "../../../utils/route-constants";


const UserPageSideBar = memo(function UserPageSideBar() {
  return (
     <Box sx={{ p: 2 }}>
          <MenuList>
            <MenuItem  component={RoutLink} to={`${TO_USER}/account`}>
              Account
            </MenuItem>
            <MenuItem component={RoutLink} to={`${TO_USER}/profile`}>
              Profile
            </MenuItem>
            <MenuItem component={RoutLink} to={`${TO_USER}/email`}>
              Email
            </MenuItem>
            <MenuItem component={RoutLink} to={`${TO_USER}/security`}>
              Security & Privacy
            </MenuItem>
          </MenuList>
      </Box>
  )
});
export default UserPageSideBar;