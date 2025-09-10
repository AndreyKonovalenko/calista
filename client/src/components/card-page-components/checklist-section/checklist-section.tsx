import React, { useCallback, useState } from 'react';
import { Stack, Button } from '@mui/material';
import { CardCheckListTextAreaStyled } from '../card-page-styled-elements/card-page-styled-elements';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { handleFormSubmitEvent } from '../../../utils/utils';
import { useAddChecklist, useUIActions } from '../../../services/ui-store';
import {
  useChecklists,
  useSortedChecklists,
} from '../../../services/checklist-store';
import { useCreateChecklist } from '../../../api/checklists-api-queries';

const CheckListSection = (props: { cardId: string, listId: string, boardId: string }) => {
  const addChecklist = useAddChecklist();
  const createChecklistQuery = useCreateChecklist();
  const { setAddChecklist } = useUIActions();
  const checklists = useChecklists();
  const sortedChecklists = useSortedChecklists();
  const { cardId, listId, boardId } = props;

  const [checklistName, setChecklistName] = useState('cheklist name');

  const handleCancelAddChecklist = () => {
    setAddChecklist();
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

  const addChecklistform = (
    <Stack
      component="form"
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        handleAddNewChecklist(event);
      }}
      spacing={1}
    >
      <Stack direction="row" spacing={1}>
        <Stack direction="column" justifyContent="center">
          <ChecklistIcon fontSize="small" />
        </Stack>
        <CardCheckListTextAreaStyled
          name="checklistName"
          autoFocus
          rows={1}
          value={checklistName}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setChecklistName(event.target.value);
          }}
          onFocus={(event: React.FocusEvent<HTMLTextAreaElement>) => {
            event.target.select();
          }}
          onBlur={(event: React.FocusEvent<HTMLTextAreaElement>) => {
            handleFormSubmitEvent(event);
          }}
          onKeyDown={(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleFormSubmitEvent(event);
            }
          }}
        />
      </Stack>
      <Stack direction="row">
        <Button type="submit" variant="contained">
          ADD
        </Button>
        <Button variant="text" onClick={handleCancelAddChecklist}>
          CANCEL
        </Button>
      </Stack>
    </Stack>
  );

  return addChecklist ? addChecklistform : null;
};
export default CheckListSection;
