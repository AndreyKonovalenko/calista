import React from 'react';
import ChecklistItemDndContainer from './checklist-item-dnd-container';
import ChecklistItemContent from './checklist-item-content';

const ChecklistItem = (props: { _id: string }) => {
  const { _id } = props;

  return (
    <ChecklistItemDndContainer>
      <ChecklistItemContent _id={_id} />
    </ChecklistItemDndContainer>
  );
};

export default ChecklistItem;
