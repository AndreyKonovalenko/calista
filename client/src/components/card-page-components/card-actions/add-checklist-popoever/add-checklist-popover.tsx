import React, { useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router';
import {
  useSortedChecklists,
  useChecklists,
} from '../../../../services/checklist-store';
import { Stack, Button, Popover, PopoverOrigin } from '@mui/material';
import { useCreateChecklist } from '../../../../api/checklists-api-queries';
import { handleFormSubmitEvent } from '../../../../utils/utils';
import { CardChecklistTextAreaStyled } from '../../card-page-styled-elements/card-page-styled-elements';
import { useUIAction } from '../../../../services/ui-store';

const styles = {
  menu: {
    zIndex: 10000,
  },
  menuContent: {
    pt: 1,
    pb: 1,
    pl: 2,
    pr: 2,
    outline: 'none',
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

const AddChecklistPopover = (props: {
  anchorEl: null | HTMLElement;
  closeAddChecklistMenu: () => void;
}) => {
  const { id, listId, boardId } = useParams();
  if (!id || !listId || !boardId) {
    return;
  }
  const { setNewItemAdded } = useUIAction();
  const inputRef = useRef<HTMLTextAreaElement>(null);
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
      setNewItemAdded(true);
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
    event.preventDefault();
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

  const handlePopoverEntered = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Popover
      sx={styles.menu}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      slotProps={{ transition: handlePopoverEntered }}
      anchorEl={anchorEl}
      open={open}
      onClose={closeAddChecklistMenu}
    >
      <Stack
        component="form"
        onSubmit={onSubmitEventHandler}
        spacing={3}
        sx={styles.menuContent}
      >
        <CardChecklistTextAreaStyled
          ref={inputRef}
          name="checklistName"
          rows={1}
          value={checklistName}
          onChange={onChangeEventHandler}
          onFocus={onFocusEventHandler}
          onBlur={onBlurEventHandler}
          onKeyDown={onEneterDownEventHandler}
        />
        <Stack direction="row" justifyContent="end" spacing={2}>
          <Button
            id="newChecklistSubmitButton"
            type="submit"
            variant="contained"
          >
            ADD
          </Button>
          <Button onClick={closeAddChecklistMenu}>CANCEL</Button>
        </Stack>
      </Stack>
    </Popover>
  );
};

export default AddChecklistPopover;

// function MyPopover({ open, anchorEl, onClose }) {
//     const inputRef = useRef(null);

//     const handlePopoverEntered = () => {
//       if (inputRef.current) {
//         inputRef.current.focus();
//       }
//     };

//     return (
//       <Popover
//         open={open}
//         anchorEl={anchorEl}
//         onClose={onClose}
//         TransitionProps={{ onEntered: handlePopoverEntered }}
//       >
//         <TextField inputRef={inputRef} label="Enter text" />
//       </Popover>
