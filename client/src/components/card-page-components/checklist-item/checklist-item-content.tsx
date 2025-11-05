import React, { useState } from 'react';
import {
  Grid,
  Stack,
  IconButton,
  PopoverOrigin,
  Typography
} from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChecklistItemActionsMenu from '../checklist-item-actions-menu/checklist-item-actions-menu';
// import ItemNameForm from '../item-name-form/item-name-form';

const styles = {
  cursor: {
    cursor: 'pointer',
  },
  itemBody: {
    pl: 1,
    pr: 1,
    pt: 0.5,
    pb: 0.5,
    '&:hover': {
      backgroundColor: 'listBackground.main',
      borderRadius: 2,
    },
  },
};

const anchorOrigin: PopoverOrigin = {
  vertical: 'center',
  horizontal: 'center',
};
const transformOrigin: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'left',
};

const ChecklistItemContent = (props: {
  name: string;
  state: 'incomplite' | 'complite';
  handleChangeItemState: () => void;
  hendleDeleteChecklistItem: () => void;
  _id: string;
}) => {
  const { name, state, handleChangeItemState, hendleDeleteChecklistItem } =
    props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenItemActionsMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseItemActionsMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container size={18} columns={18} rowSpacing={1}>
      <Grid
        size={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        onClick={handleChangeItemState}
        sx={styles.cursor}
      >
        {state == 'incomplite' ? (
          <CheckBoxOutlineBlank color="primary" fontSize="small" />
        ) : (
          <CheckBoxIcon color="primary" fontSize="small" />
        )}
      </Grid>
      <Grid size={17} sx={styles.itemBody}>
        <Stack
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* <ItemNameForm
            name={name}
            itemId={_id}
            handleUpdateName={()=>{}}
            updateQuery={}
          /> */}
          <Typography variant="body1" fontSize="large">
            {name}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open item action"
            onClick={handleOpenItemActionsMenu}
          >
            <MoreHorizIcon fontSize="small" />
          </IconButton>
          <ChecklistItemActionsMenu
            anchorEl={anchorEl}
            closeHandler={handleCloseItemActionsMenu}
            deleteHandler={hendleDeleteChecklistItem}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ChecklistItemContent;
