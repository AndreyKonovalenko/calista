import  React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { Person } from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../services/auth/auth-store';
import { Link as RouterLink, useLocation} from 'react-router-dom';
import Link from '@mui/material/Link';
import api from '../../utils/calista-api';
import { useNavigate } from 'react-router-dom';

import { TO_LOGIN, TO_MAIN } from '../../utils/route-constants';
import { Stack, Typography } from '@mui/material';

export default function HeaderBar() {
  const navigate = useNavigate();
  const {pathname} = useLocation()
  const { isAuth, username,  reset } = useAuthStore(state => state);
  const { mutate } = useMutation({
    mutationFn: api.auth.logout,
  });

  const handleLogout = () => {
    reset();
    mutate();
    navigate(`/${TO_LOGIN}`, { state: { from: pathname }, replace: true });
  };

  // useEffect(()=>{
  //   if(isSuccess && !isPending){
  //     reset();
  //     navitage(`/${TO_LOGIN}`)
  //   }
  // },[isSuccess, isPending])

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link
            component={RouterLink}
            variant="h6"
            underline="none"
            to={TO_MAIN}
            color="inherit"
          >
            Todo-boards
          </Link>
        </Box>
        {isAuth && (
          <Stack direction="row" spacing={4}>
            <Stack direction="row" sx={{ alignItems: 'center' }} spacing={1}>
              <Person color="inherit" fontSize="large" />
              <Typography variant="h6">{username}</Typography>
            </Stack>
            <IconButton
              size="large"
              onClick={handleLogout} 
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"  
              color="inherit"
            >
              <LogoutIcon fontSize="large" />
            </IconButton>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}
