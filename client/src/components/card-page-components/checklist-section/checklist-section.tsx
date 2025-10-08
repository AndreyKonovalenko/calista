import React from 'react';
import { Grid } from '@mui/material';
import {
  useChecklists,
  useSortedChecklists,
} from '../../../services/checklist-store';
import ChecklistCard from '../checklist-card/checklist-card';

const CheckListSection = () => {
  const checklists = useChecklists();
  const sortedChecklists = useSortedChecklists();
  const checklistData = sortedChecklists
    ? sortedChecklists.map(id => (
        <ChecklistCard key={id} _id={id} name={checklists[id].name} />
      ))
    : null;

  return (
    <Grid container columns={18} rowSpacing={1}>
      {checklistData}
    </Grid>
  );
};
export default CheckListSection;
