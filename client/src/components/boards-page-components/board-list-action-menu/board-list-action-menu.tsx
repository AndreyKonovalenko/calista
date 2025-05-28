import React from 'react';
import { Menu, IconButton } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDeleteList } from '../../../api/lists-api-queries';

const BoardListActionMenu = (props: { _id: string }): JSX.Element => {
  const { _id } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const deleteListQuery = useDeleteList();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteList = (listId: string) => {
    deleteListQuery.mutate(listId);
  };

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="list menu"
        onClick={handleClick}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <MoreHorizIcon fontSize="medium" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleDeleteList(_id)}>Delete List</MenuItem>
      </Menu>
    </div>
  );
};
export default BoardListActionMenu;
