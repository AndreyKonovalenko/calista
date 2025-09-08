import React, { useState } from 'react';
import { Stack, Button } from '@mui/material';
import { CardCheckListTextAreaStyled } from '../card-page-styled-elements/card-page-styled-elements';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { handleFormSubmitEvent } from '../../../utils/utils';
import { useAddChecklist, useUIActions } from '../../../services/ui-store';


const CheckListSection = (props: { cardId: string }) => {
  const addChecklist = useAddChecklist();
  const { setAddChecklist  } = useUIActions();
  const { cardId } = props;
  const [checklistName, setChecklistName] = useState('cheklist name');


  const handleCancelAddChecklist = () => {
    setAddChecklist()
  } 

  const handleAddChecklist = (
    event: React.FormEvent<HTMLFormElement>,
    cardId: string,
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const checklistName = formData.get('checklistName');
    console.log(checklistName, cardId);
  };
  const addChecklistform =  (
    <Stack
      component="form"
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        handleAddChecklist(event, cardId);
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
        <Button variant="contained" type="submit">
          ADD
        </Button>
        <Button variant="text" onClick={handleCancelAddChecklist}>
          CANCEL
        </Button>
      </Stack>
    </Stack>
  );

  return addChecklist ?  addChecklistform :  null;



};
export default CheckListSection;
