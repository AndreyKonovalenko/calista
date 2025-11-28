import React, { useState, useCallback } from 'react';
import { Grid, IconButton, PopoverOrigin, Stack, Box } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChecklistItemActionsPopover from './checklist-item-actions-popover/checklist-item-actions-popover';
import ItemNameForm from '../item-name-form/item-name-form';
import {
  useUpdateChecklistItem,
  useDeleteChecklistItem,
} from '../../../api/checklist-items-api-queries';
import {
  useChecklistItemActions,
  useChecklistItem,
} from '../../../services/checklist-item-store';

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
import {
  useStatsActions,
  useGetStatsByCardId,
} from '../../../services/stats-store';

const anchorOrigin: PopoverOrigin = {
  vertical: 'center',
  horizontal: 'center',
};
const transformOrigin: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'left',
};

const ChecklistItemContent = (props: { _id: string }) => {
  const { _id } = props;
  const updateChecklistItemQuery = useUpdateChecklistItem();
  const deleteChecklistItemQuery = useDeleteChecklistItem();
  const { updateChecklistItemsStats } = useStatsActions();

  const checklistItem = useChecklistItem(_id);
  const { updateChecklistItemState, updateChecklistItemName } =
    useChecklistItemActions();
  if (!checklistItem) {
    return null;
  }
  const { name, state, cardId } = checklistItem;
  const cardStats = useGetStatsByCardId(cardId);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenItemActionsMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseItemActionsMenu = () => {
    setAnchorEl(null);
  };

  const handleChangeItemState = useCallback(() => {
    const itemState = state === 'incomplete' ? 'complete' : 'incomplete';
    updateChecklistItemState(_id, itemState);
    if (cardStats) {
      let result = cardStats.checklistItems.complete;
      if (itemState === 'incomplete') {
        result = result - 1;
      }
      if (itemState === 'complete') {
        result = result + 1;
      }
      updateChecklistItemsStats(
        cardId,
        cardStats?.checklistItems.quantity,
        result,
      );
    }

    updateChecklistItemQuery.mutate({
      id: _id,
      data: { state: itemState },
    });
  }, [_id, state, cardStats]);

  const hendleDeleteChecklistItem = useCallback(() => {
    deleteChecklistItemQuery.mutate(_id);
  }, [_id]);

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
        {state == 'incomplete' ? (
          <CheckBoxOutlineBlank color="primary" fontSize="small" />
        ) : (
          <CheckBoxIcon color="primary" fontSize="small" />
        )}
      </Grid>
      <Grid size={17} container sx={styles.itemBody}>
        <Stack
          display="flex"
          flexGrow="1"
          flexDirection="row"
          justifyContent="space-between"
        >
          <ItemNameForm
            name={name}
            itemId={_id}
            handleUpdateName={updateChecklistItemName}
            updateQuery={updateChecklistItemQuery}
          />
          <Box display="flex" alignItems="center">
            <IconButton
              color="inherit"
              aria-label="open item action"
              onClick={handleOpenItemActionsMenu}
            >
              <MoreHorizIcon fontSize="small" />
            </IconButton>
          </Box>
          <ChecklistItemActionsPopover
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
