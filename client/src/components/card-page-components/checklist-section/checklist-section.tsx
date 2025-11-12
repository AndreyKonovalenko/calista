import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import {
  useChecklists,
  useSortedChecklists,
} from '../../../services/checklist-store';
import Checklist from '../checklist/checklist';

const styles = {
  extraPadding: {
    pb: 4,
    pt: 2,
  },
};

const CheckListSection = () => {
  const checklists = useChecklists();
  const sortedChecklists = useSortedChecklists();

  const checklistData = sortedChecklists
    ? sortedChecklists.map((id, index) => {
        if (
          sortedChecklists.length > 0 &&
          index === sortedChecklists.length - 1
        ) {
          return (
            <Checklist
              key={id}
              _id={id}
              name={checklists[id].name}
              isLast={true}
            />
          );
        } else {
          return (
            <Checklist
              key={id}
              _id={id}
              name={checklists[id].name}
              isLast={false}
            />
          );
        }
      })
    : null;

  useEffect(() => {
    const lastChecklist = document.getElementById('isLastList');
    lastChecklist?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }, [sortedChecklists]);

  return (
    <Grid container columns={18} rowSpacing={1} sx={styles.extraPadding}>
      {checklistData}
    </Grid>
  );
};
export default CheckListSection;
