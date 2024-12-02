import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import HeaderBar from '../components/header-bar/header-bar';
import { HEADER } from './config-layout';

const MainLayout = (): JSX.Element => {
	return (
		<Box
			sx={{
				display: 'flex',
				width: '100%',
				overflow: 'hidden',
				outline: 'none',
			}}>
			<HeaderBar />
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					minHeight: `calc(100vh - ${HEADER.H_DESKTOP}px)`,
					mt: `${HEADER.H_DESKTOP}px`,
					overflowY: 'hidden',
				}}>
				<Outlet />
			</Box>
		</Box>
	);
};

export default MainLayout;

// <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
