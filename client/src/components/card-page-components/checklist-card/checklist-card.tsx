import React, { useState, useCallback } from 'react';
import { Typography, Stack, Grid, Button, Menu } from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import {
  useDeleteChecklist,
  useUpdateChecklist,
} from '../../../api/checklists-api-queries';
import { CardChecklistNameTextAreaStyled } from '../card-page-styled-elements/card-page-styled-elements';
import { handleFormSubmitEvent } from '../../../utils/utils';
import { useChecklistActions } from '../../../services/checklist-store';

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
  textarea: {
    box: {
      cursor: 'edit',
    },
    typography: {
      overflow: 'hidden',
      overflowWrap: 'anywhere',
      resize: 'none',
    },
  },
};

const ChecklistCard = (props: { _id: string; name: string }) => {
  const { _id, name } = props;
  const deleteChecklistQuery = useDeleteChecklist();
  const updateChecklistNameQuery = useUpdateChecklist();
  const { updateChecklistName } = useChecklistActions();
  const [editing, setEditing] = useState(false);
  const [checklistName, setChecklistName] = useState(name);
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
  const handleSetEditing = () => {
    setEditing(true);
  };
  const handleUpdateChecklistName = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const checklistName = formData.get('cheklistName');
      updateChecklistNameQuery.mutate({
        id: _id,
        data: { name: checklistName },
      });
    },
    [_id],
  );
  const onChangeEventHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setChecklistName(event.target.value);
  };
  const onFocusEventHandler = (
    event: React.FocusEvent<HTMLTextAreaElement>,
  ) => {
    event.target.select();
  };
  const onBlurEventHandler = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (checklistName.length === 0) {
      setChecklistName(name);
    }
    if (checklistName.length > 0 && checklistName !== name) {
      updateChecklistName(_id, checklistName);
      handleFormSubmitEvent(event);
    }
    setEditing(false);
  };

  const onKeyDownEventHandler = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (checklistName.length === 0) {
        setChecklistName(name);
      }
      if (checklistName.length > 0 && checklistName !== name) {
        updateChecklistName(_id, checklistName);
        handleFormSubmitEvent(event);
      }
      setEditing(false);
    }
    if (event.key === 'Escape') {
      setEditing(false);
    }
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    handleUpdateChecklistName(event);
  };

  const checklistNameForm = (
    <Stack
      direction="column"
      justifyContent="center"
      component="form"
      onSubmit={onSubmit}
    >
      {editing ? (
        <CardChecklistNameTextAreaStyled
          name="checklistName"
          autoFocus
          rows={1}
          value={checklistName}
          placeholder={name}
          onChange={onChangeEventHandler}
          onFocus={onFocusEventHandler}
          onBlur={onBlurEventHandler}
          onKeyDown={onKeyDownEventHandler}
        />
      ) : (
        <Stack
          direction="column"
          justifyContent="center"
          onClick={handleSetEditing}
        >
          <Typography sx={styles.textarea.box} variant="body1">
            {checklistName}
          </Typography>
        </Stack>
      )}
    </Stack>
  );

  return (
    <Grid container size={18} columns={18}>
      <Grid
        size={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <CheckBoxOutlinedIcon fontSize="small" />
      </Grid>
      <Grid
        size={15}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        {checklistNameForm}
      </Grid>
      <Grid size={2}>
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
      </Grid>
    </Grid>
  );
};

export default ChecklistCard;
