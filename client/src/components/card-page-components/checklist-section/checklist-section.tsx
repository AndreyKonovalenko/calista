import React from 'react'
import { Stack, Button } from '@mui/material'
import { CardCheckListTextAreaStyled } from '../card-page-styled-elements/card-page-styled-elements';
import ChecklistIcon from '@mui/icons-material/Checklist';

import { useAddChecklist } from '../../../services/ui-store';

const CheckListSection = () => {  
  const addChecklist = useAddChecklist()
  return (
    addChecklist ?
  <Stack spacing={1}>
    <Stack direction='row' spacing={1}>
      <Stack direction='column' justifyContent='center'>
        <ChecklistIcon fontSize='small'/>
      </Stack>
        <CardCheckListTextAreaStyled rows={1}/>
      </Stack>
      <Stack direction='row'>
        <Button variant='contained'>ADD</Button>
        <Button variant='text' onClick={()=>{}}>CANCEL</Button>
      </Stack>
  </Stack>: null
  )
}
export default CheckListSection