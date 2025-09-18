import React, { useCallback, useState } from 'react';
import { Stack, Button, Menu } from '@mui/material';
import { CardChecklistTextAreaStyled } from '../card-page-styled-elements/card-page-styled-elements';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { handleFormSubmitEvent } from '../../../utils/utils';
import { useAddChecklist, useUIActions } from '../../../services/ui-store';
import {
  useChecklists,
  useSortedChecklists,
} from '../../../services/checklist-store';
import { useCreateChecklist } from '../../../api/checklists-api-queries';
import ChecklistCard from '../checklist-card/checklist-card';

const styles = {
  menu: {
    zIndex: 10000,
  },
};
const CheckListSection = (props: {
  cardId: string;
  listId: string;
  boardId: string;
}) => {
  const addChecklist = useAddChecklist();
  console.log(addChecklist);
  const createChecklistQuery = useCreateChecklist();
  const { setAddChecklist } = useUIActions();
  const checklists = useChecklists();
  const sortedChecklists = useSortedChecklists();
  const { cardId, listId, boardId } = props;
  const [checklistName, setChecklistName] = useState('cheklist name');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // const handleCancelAddChecklist = () => {
  //   setAddChecklist();
  // };

  const handleOpenAddMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAddMenu = () => {
    setAnchorEl(null);
  };
  const handleAddNewChecklist = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      let pos = 16584;
      if (checklists && sortedChecklists && sortedChecklists?.length > 0) {
        pos =
          checklists[sortedChecklists[sortedChecklists.length - 1]].pos + pos;
      }
      const formData = new FormData(event.currentTarget);
      createChecklistQuery.mutate({
        name: formData.get('checklistName'),
        boardId: boardId,
        listId: listId,
        cardId: cardId,
        pos: pos,
      });
    },
    [cardId, checklists, sortedChecklists],
  );

  const checklistData = sortedChecklists
    ? sortedChecklists.map(id => (
        <ChecklistCard key={id} _id={id} name={checklists[id].name} />
      ))
    : null;

  const onSubmitEventHandler = (event: React.FormEvent<HTMLFormElement>) => {
    handleAddNewChecklist(event);
  };

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
    const submitButton = document.getElementById('newChecklistSubmitButton');
    if (event.relatedTarget === submitButton) {
      return;
    }
    setAddChecklist();
  };

  const onEneterDownEventHandler = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleFormSubmitEvent(event);
      setAddChecklist();
    }
    if (event.key === 'Escape') {
      setAddChecklist();
    }
  };

  const addChecklistform = (
    <Menu
      sx={styles.menu}
      anchorEl={anchorEl}
      open={open}
      onClose={handleOpenAddMenu}
    >
      <Stack component="form" onSubmit={onSubmitEventHandler} spacing={1}>
        <Stack direction="row" spacing={1}>
          <Stack direction="column" justifyContent="center">
            <ChecklistIcon fontSize="small" />
          </Stack>
          <CardChecklistTextAreaStyled
            name="checklistName"
            autoFocus
            rows={1}
            value={checklistName}
            onChange={onChangeEventHandler}
            onFocus={onFocusEventHandler}
            onBlur={onBlurEventHandler}
            onKeyDown={onEneterDownEventHandler}
          />
        </Stack>
        <Stack direction="row">
          <Button
            id="newChecklistSubmitButton"
            type="submit"
            variant="contained"
          >
            ADD
          </Button>
          <Button variant="text" onClick={handleCloseAddMenu}>
            CANCEL
          </Button>
        </Stack>
      </Stack>
    </Menu>
  );

  return (
    <React.Fragment>
      <Button onClick={handleOpenAddMenu}>ADD CHECKLIST</Button>
      <Stack>{checklistData}</Stack>
      {addChecklistform}
    </React.Fragment>
  );
};
export default CheckListSection;
