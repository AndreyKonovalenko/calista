import React, {useState} from 'react'
import { Stack, Button } from '@mui/material'
import { CardCheckListTextAreaStyled } from '../card-page-styled-elements/card-page-styled-elements';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { handleFormSubmitEvent } from '../../../utils/utils';
import { useAddChecklist } from '../../../services/ui-store';


const CheckListSection = (props: {cardId: string}) => {  
  const addChecklist = useAddChecklist()
  const {cardId} = props;
  const [checklistName, setChecklistName ] = useState('cheklist name')

  const handleAddChecklist = (event: React.FormEvent<HTMLFormElement>, cardId: string)=> {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const checklistName = formData.get('checklistName');
    console.log(checklistName, cardId)
  } 
  return (
    addChecklist ?
  <Stack 
    component="form"
    onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
      handleAddChecklist(event, cardId)
    }}
    spacing={1}
    >
    <Stack direction='row' spacing={1}>
      <Stack direction='column' justifyContent='center'>
        <ChecklistIcon fontSize='small'/>
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
      <Stack direction='row'>
        <Button variant='contained' type='submit'>ADD</Button>
        <Button variant='text' onClick={()=>{}}>CANCEL</Button>
      </Stack>
  </Stack>: null
  )
}
export default CheckListSection