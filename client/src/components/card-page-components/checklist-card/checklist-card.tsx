import React, { useState, useCallback } from 'react';
import {
  Typography,
  Stack,
  Grid,
  Button,
  Menu,
  PopoverOrigin,
} from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import {
  useDeleteChecklist,
  useUpdateChecklist,
} from '../../../api/checklists-api-queries';
import CheckListAddItemFrom from '../chekclist-add-item-form/checklist-add-item-form';
import { CardChecklistNameTextAreaStyled } from '../card-page-styled-elements/card-page-styled-elements';
import { handleFormSubmitEvent } from '../../../utils/utils';
import { useChecklistActions } from '../../../services/checklist-store';
import LinearProgress from '@mui/material/LinearProgress';

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

const anchorOrigin: PopoverOrigin = {
  vertical: 'center',
  horizontal: 'center',
};
const transformOrigin: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'center',
};

const ChecklistCard = (props: { _id: string; name: string }) => {
  const { _id, name } = props;
  const deleteChecklistQuery = useDeleteChecklist();
  const updateChecklistNameQuery = useUpdateChecklist();
  const { updateChecklistName } = useChecklistActions();
  const [editing, setEditing] = useState(false);
  const [checklistName, setChecklistName] = useState(name);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [addAnItem, setAddAnItem] = useState(false);
  const progress = 18;
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
  const handleSetAddAnItem = () => {
    setAddAnItem(true);
  };
  const handleCancelationAddAnItem = () => {
    setAddAnItem(false);
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

  // const addAnItmeFrom = (
  //   <Grid
  //     container
  //     size={18}
  //     columns={18}
  //     rowSpacing={1}
  //     component="form"
  //     onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
  //       console.log(event);
  //       // handleUpdateDescription(event, cardId);
  //       // setDescriptionEdit(false);
  //     }}
  //   >
  //     <Grid size={1} />
  //     <Grid
  //       size={17}
  //       display="flex"
  //       flexDirection="column"
  //       justifyContent="center"
  //     >
  //       <CardChecklistNameTextAreaStyled
  //         name="newItemName"
  //         autoFocus
  //         rows={1}
  //         value={'newIem name'}
  //         placeholder={'and an new item'}
  //         onChange={() => {}}
  //         onFocus={() => {}}
  //         onBlur={() => {}}
  //         onKeyDown={() => {}}
  //       />
  //     </Grid>
  //     <Grid size={1} />
  //     <Grid size={17}>
  //       <Stack direction="row" justifyContent="start" spacing={1}>
  //         <Button variant="contained" type="submit">
  //           SAVE
  //         </Button>
  //         <Button variant="outlined" onClick={handleCancelationAddAnItem}>
  //           CANCLE
  //         </Button>
  //       </Stack>
  //     </Grid>
  //   </Grid>
  // );

  return (
    <Grid container size={18} columns={18} rowSpacing={1}>
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
          anchorOrigin={anchorOrigin}
          transformOrigin={transformOrigin}
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
      <Grid
        size={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Typography fontSize="small" variant="body1">
          {progress}%
        </Typography>
      </Grid>
      <Grid
        size={17}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <LinearProgress variant="determinate" value={progress} />
      </Grid>
      {addAnItem ? (
        <CheckListAddItemFrom
          _id={_id}
          handleCancelationAddAnItem={handleCancelationAddAnItem}
        />
      ) : (
        <React.Fragment>
          <Grid size={1} />
          <Grid
            size={5}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Button variant="outlined" onClick={handleSetAddAnItem}>
              Add an item
            </Button>
          </Grid>
        </React.Fragment>
      )}
    </Grid>
  );
};

export default ChecklistCard;
