import React, { useCallback } from 'react';
import ChecklistItemDndContainer from './checklist-item-dnd-container';
import ChecklistItemContent from './checklist-item-content';
import {
  useChecklistItem,
  useChecklistItemActions,
} from '../../../services/checklist-item-store';
import { useUpdateChecklistItem } from '../../../api/checklist-items-api-queries';
const ChecklistItem = (props: { _id: string }) => {
  const { _id } = props;
  const updateChecklistItemQuery = useUpdateChecklistItem();
  const checklistItem = useChecklistItem(_id);
  const { updateChecklistItemState } = useChecklistItemActions();
  if (!checklistItem) {
    return null;
  }
  const { name, state } = checklistItem;

  const handleChangeItemState = useCallback(() => {
    const itemState = state === 'incomplite' ? 'complite' : 'incomplite';
    console.log(state);
    updateChecklistItemState(_id, itemState);
    updateChecklistItemQuery.mutate({
      id: _id,
      data: { state: itemState },
    });
  }, [_id, state]);

  // const handleUpdateChecklistName = useCallback(
  //   (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     const formData = new FormData(event.currentTarget);
  //     const checklistName = formData.get('cheklistName');
  //     updateChecklistNameQuery.mutate({
  //         id: _id,
  //         data: { name: checklistName },
  //       });
  //     },
  //     [_id],
  //   );

  return (
    <ChecklistItemDndContainer>
      <ChecklistItemContent
        name={name}
        state={state}
        handleChangeItemState={handleChangeItemState}
      />
    </ChecklistItemDndContainer>
  );
};

export default ChecklistItem;
