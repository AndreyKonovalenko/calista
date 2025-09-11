import React, { useState } from 'react';
import { Typography, Stack, Button, Menu } from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { useDeleteChecklist } from '../../../api/checklists-api-queries';

const styles = {
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

const ChecklistCard = (props: { _id: string; name: string }) => {
  const { _id, name } = props;
  const deleteChecklistQuery = useDeleteChecklist();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenDeleteMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const handleCloseDeleteMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteChecklist = () => {
    deleteChecklistQuery.mutate(_id);
  };
  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack direction="row" spacing={1}>
        <Stack direction="column" justifyContent="center">
          <CheckBoxOutlinedIcon fontSize="small" />
        </Stack>
        <Stack direction="column" justifyContent="center">
          <Typography>{name}</Typography>
        </Stack>
      </Stack>
      <Button variant="text" onClick={handleOpenDeleteMenu}>
        DELETE
      </Button>
      <Menu
        sx={styles.menu}
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseDeleteMenu}
      >
        <Stack sx={styles.menuContent} spacing={2}>
          <Typography variant="h6">
            Deleting a checklist is permanent and there is no way to get it
            back.
          </Typography>
          <Stack direction="row" justifyContent="end" spacing={2}>
            <Button onClick={handleCloseDeleteMenu}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleDeleteChecklist}
              color="error"
            >
              Delete Checklist
            </Button>
          </Stack>
        </Stack>
      </Menu>
    </Stack>
  );
};

export default ChecklistCard;
