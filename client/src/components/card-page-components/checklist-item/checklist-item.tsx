import React from "react";
import ChecklistItemDndContainer from "./checklist-item-dnd-container";
import ChecklistItemContent from "./checklist-item-content";
import { useChecklistItem } from "../../../services/checklist-item-store";

const ChecklistItem = (props: {_id: string}) => {
  const {_id} = props;
  const checklistItem = useChecklistItem(_id)
  if (!checklistItem) {
    return null;
  }
  const { name } = checklistItem;
  return <ChecklistItemDndContainer>
      <ChecklistItemContent name={name}/>
    </ChecklistItemDndContainer>
}

export default ChecklistItem;