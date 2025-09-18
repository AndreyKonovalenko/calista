import React, { useState, useCallback } from 'react';
import { useParams } from 'react-router';
import {
  useSortedChecklists,
  useChecklists,
} from '../../../services/checklist-store';
import { Stack, Button, Menu } from '@mui/material';
import { useCreateChecklist } from '../../../api/checklists-api-queries';
import { handleFormSubmitEvent } from '../../../utils/utils';
import { CardChecklistTextAreaStyled } from '../card-page-styled-elements/card-page-styled-elements';

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

const AddChecklistMenu = (props: {
  anchorEl: null | HTMLElement;
  closeAddChecklistMenu: () => void;
}) => {
  const { id, listId, boardId } = useParams();
  if (!id || !listId || !boardId) {
    return;
  }
  const createChecklistQuery = useCreateChecklist();
  const checklists = useChecklists();
  const sortedChecklists = useSortedChecklists();
  const { anchorEl, closeAddChecklistMenu } = props;
  const [checklistName, setChecklistName] = useState('cheklist name');
  const open = Boolean(anchorEl);

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
        cardId: id,
        pos: pos,
      });
    },
    [id, checklists, sortedChecklists],
  );

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
  };

  const onEneterDownEventHandler = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleFormSubmitEvent(event);
      closeAddChecklistMenu();
    }
    if (event.key === 'Escape') {
      closeAddChecklistMenu();
    }
  };

  return (
    <Menu
      sx={styles.menu}
      anchorEl={anchorEl}
      open={open}
      onClose={closeAddChecklistMenu}
    >
      <Stack
        component="form"
        onSubmit={onSubmitEventHandler}
        spacing={1}
        sx={styles.menuContent}
      >
        <Stack direction="row" spacing={1}>
          {/* <Stack direction="column" justifyContent="center">
            <ChecklistIcon fontSize="small" />
          </Stack> */}
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
          <Button variant="text" onClick={closeAddChecklistMenu}>
            CANCEL
          </Button>
        </Stack>
      </Stack>
    </Menu>
  );
};

export default AddChecklistMenu;
