import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import {
  useSortedChecklistsKeys,
  useChecklists,
} from '../../../services/checklist-store';
import Checklist from '../checklist/checklist';
import { useUIAction, useIsNewItemAdded } from '../../../services/ui-store';

const styles = {
  extraPadding: {
    pb: 4,
    pt: 2,
  },
};

const CheckListSection = (props: { cardId: string }) => {
  const { cardId } = props;
  const checklists = useChecklists();
  const sortedChecklistKeys = useSortedChecklistsKeys(cardId);
  const { setNewItemAdded } = useUIAction();
  const isNewItemAdded = useIsNewItemAdded();

  const checklistData = sortedChecklistKeys
    ? sortedChecklistKeys.map((id, index) => {
        if (
          sortedChecklistKeys.length > 0 &&
          index === sortedChecklistKeys.length - 1
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
    return () => {
      if (isNewItemAdded === true) {
        setNewItemAdded(false);
      }
    };
  }, [isNewItemAdded]);

  useEffect(() => {
    const lastChecklist = document.getElementById('isLastList');
    if (isNewItemAdded) {
      lastChecklist?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, [sortedChecklistKeys]);

  return (
    <Grid container columns={18} rowSpacing={1} sx={styles.extraPadding}>
      {checklistData}
    </Grid>
  );
};
export default CheckListSection;
