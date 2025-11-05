import React, { useState} from 'react';
import { Typography, Grid, Button, PopoverOrigin } from '@mui/material';
import {
  useDeleteChecklist,
  useUpdateChecklist,
} from '../../../api/checklists-api-queries';
import ChecklistItem from '../checklist-item/checklist-item';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import CheckListAddItemFrom from '../chekclist-add-item-form/checklist-add-item-form';
import { useChecklistActions } from '../../../services/checklist-store';
import { useChecklistItems } from '../../../services/checklist-item-store';
import { useSortedChecklistItemsByChecklistId } from '../../../services/checklist-item-store';
import LinearProgress from '@mui/material/LinearProgress';
import { progressCalc } from '../../../utils/utils';
import DeleteItemMenu from '../delete-item-menu/delete-item-menu';
import ItemNameForm from '../item-name-form/item-name-form';

const anchorOrigin: PopoverOrigin = {
  vertical: 'bottom',
  horizontal: 'center',
};
const transformOrigin: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'center',
};

const ChecklistCard = (props: { _id: string; name: string }) => {
  const { _id, name } = props;
  const deleteChecklistQuery = useDeleteChecklist();
  const sortedChecklistItems = useSortedChecklistItemsByChecklistId(_id);
  const checklistItems = useChecklistItems();
  const updateChecklistNameQuery = useUpdateChecklist();
  const { updateChecklistName } = useChecklistActions();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [addAnItem, setAddAnItem] = useState(false);
  const progress = progressCalc(sortedChecklistItems, checklistItems);
  const handleOpenDeleteMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDeleteMenu = () => {
    setAnchorEl(null);
  };
  const handleDeleteChecklist = () => {
    deleteChecklistQuery.mutate(_id);
  };

  const handleSetAddAnItem = () => {
    setAddAnItem(true);
  };
  const handleCancelationAddAnItem = () => {
    setAddAnItem(false);
  };

  // const handleUpdateChecklistName = useCallback(
  //   (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     const formData = new FormData(event.currentTarget);
  //     const checklistName = formData.get('cheklistName');
  //     updateChecklistNameQuery.mutate({
  //       id: _id,
  //       data: { name: checklistName },
  //     });
  //   },
  //   [_id],
  // );

  const checklistItmesList = sortedChecklistItems
    ? sortedChecklistItems.map(checklistItemId => (
        <ChecklistItem key={checklistItemId} _id={checklistItemId} />
      ))
    : null;

  return (
    <Grid container size={18} columns={18} rowSpacing={1}>
      <Grid
        size={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <LibraryAddCheckOutlinedIcon color="primary" fontSize="small" />
      </Grid>
      <Grid
        size={15}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
       <ItemNameForm
          name={name}
          updateQuery={updateChecklistNameQuery}
          handleUpdateName={updateChecklistName}
          itemId={_id}
       />
      </Grid>
      <Grid size={2}>
        <Button variant="text" onClick={handleOpenDeleteMenu}>
          DELETE
        </Button>
        <DeleteItemMenu
          anchorEl={anchorEl}
          closeHandler={handleCloseDeleteMenu}
          deleteHandler={handleDeleteChecklist}
          prompt="Deleting a checklist is permanent and there is no way to get it back."
          anchorOrigin={anchorOrigin}
          transformOrigin={transformOrigin}
        />
      </Grid>
      <Grid container size={18} columns={18} columnGap={1}>
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
          size={16}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <LinearProgress variant="determinate" value={progress} />
        </Grid>
      </Grid>

      <Grid size={18}>{checklistItmesList}</Grid>
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
