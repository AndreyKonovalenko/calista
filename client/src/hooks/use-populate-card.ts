// import { useState } from "react";
// import { useCard } from "../services/card-store";
// import { useChecklistItems } from "../services/checklist-item-store";
// import { useSortedChecklistsKeys } from "../services/checklist-store";
// import { useChecklists } from "../services/checklist-store";
// import { useSortedChecklistsItemsKeys } from "../services/checklist-item-store";

// export const usePopulateCard = (id: string | null) => {
//   const [data, setData] = useState(null)
//   if (!id){
//     return;
//   }
//   const card = useCard(id);
//   const checklists = useChecklists();
//   const checklistItems = useChecklistItems();
//   const sortedChecklistsByCardId = useSortedChecklistsKeys(id);
//   const checklistsByCardId = sortedChecklistsByCardId.map(checkistId => {
//     const sortedChecklistItems = useSortedChecklistsItemsKeys(checkistId);
//     const checlistItemsByChecklistId = sortedChecklistItems.map(
//       checklistItemId => {
//         return { name: checklistItems[checklistItemId].name };
//       },
//     );
//     return {
//       name: checklists[checkistId].name,
//       checlistItems: checlistItemsByChecklistId,
//     };

//   });
//   return {
//     name: card?.name,
//     description: card?.description,
//     checklists: checklistsByCardId,
//   };
// };
