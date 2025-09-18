import React from 'react';
import { Stack } from '@mui/material';
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
    <React.Fragment>
      <Stack>{checklistData}</Stack>
    </React.Fragment>
  );
};
export default CheckListSection;
