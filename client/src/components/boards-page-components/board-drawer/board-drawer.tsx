import React from 'react';
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
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { drawerWidth } from '../../../layout/config-layout';
import { v4 as uuidv4 } from 'uuid';

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

const BoardDrawer = (props: TBoadDrawer): JSX.Element => {
	const { open, handleDrawerClose, handleDeleteBoard } = props;

	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					marginTop: '64px',
				},
			}}
			variant='persistent'
			anchor='right'
			open={open}>
			<DrawerHeader>
				<IconButton onClick={handleDrawerClose}>
					<ChevronRightIcon />
				</IconButton>
			</DrawerHeader>
			<Divider />
			<List>
				<ListItem key={uuidv4()} disablePadding>
					<ListItemButton component={Button} onClick={handleDeleteBoard}>
						<ListItemIcon>
							<DeleteOutlineIcon />
						</ListItemIcon>
						<ListItemText primary={'delete board'} />
					</ListItemButton>
				</ListItem>
			</List>
		</Drawer>
	);
};

export default BoardDrawer;
