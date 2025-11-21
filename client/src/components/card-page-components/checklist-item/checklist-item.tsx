import React from 'react';
import ChecklistItemDndContainer from './checklist-item-dnd-container';
import ChecklistItemContent from './checklist-item-content';

const ChecklistItem = (props: { _id: string; checklistId: string }) => {
  const { _id, checklistId } = props;

  return (
    <ChecklistItemDndContainer _id={_id} checklistId={checklistId}>
      <ChecklistItemContent _id={_id} />
    </ChecklistItemDndContainer>
  );
};

export default ChecklistItem;
