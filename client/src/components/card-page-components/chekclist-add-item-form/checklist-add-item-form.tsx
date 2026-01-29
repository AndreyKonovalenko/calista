import React, { useCallback, useState } from 'react';
import { Grid, Stack, Button } from '@mui/material';
import { useParams } from 'react-router';
import { CardChecklistNameTextAreaStyled } from '../card-page-styled-elements/card-page-styled-elements';
import { useCreateChecklistItem } from '../../../api/checklist-items-api-queries';
import {
  useSortedChecklistsItemsKeys,
  useChecklistItems,
} from '../../../services/checklist-item-store';
import { handleFormSubmitEvent } from '../../../utils/utils';
import { toast } from 'react-toastify';
const CheckListAddItemFrom = (props: {
  _id: string;
  handleCancelationAddAnItem: () => void;
}) => {
  const { boardId, listId, id } = useParams();
  const checklistItems = useChecklistItems();
  if (!id || !boardId || !listId) {
    return null;
  }
  const { _id, handleCancelationAddAnItem } = props;
  const sortedChecklistItems = useSortedChecklistsItemsKeys(_id);

  const createChecklistItemQuery = useCreateChecklistItem();
  const [checklistItemName, setChecklistItemName] = useState(
    'new checklist item name',
  );

  const handleAddNewChecklistItem = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      let pos = 16384;
      if (
        checklistItems &&
        sortedChecklistItems &&
        sortedChecklistItems?.length > 0
      ) {
        pos =
          checklistItems[sortedChecklistItems[sortedChecklistItems.length - 1]]
            .pos + pos;
      }
      const formData = new FormData(event.currentTarget);
      const regExpPatter: RegExp = new RegExp(`\r?\n|\r`);
      const name = formData.get('checklistItemName');

      if (name) {
        const nameArr = name.toString().split(regExpPatter);
        if (nameArr.length > 500) {
          toast.error('checklist must not contain more than 500 elements');
          return;
        }
        nameArr.forEach((element, index) => {
          setTimeout(() => {
            const newPos = pos + index * 16384;
            createChecklistItemQuery.mutate({
              name: element,
              boardId: boardId,
              listId: listId,
              cardId: id,
              checklistId: _id,
              pos: newPos,
            });
          }, index*150);
        });
      }
    },
    [id, checklistItems, sortedChecklistItems],
  );

  const onSubmitEventHandler = (event: React.FormEvent<HTMLFormElement>) => {
    handleAddNewChecklistItem(event);
  };

  const onChangeEventHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setChecklistItemName(event.target.value);
  };

  const onFocusEventHandler = (
    event: React.FocusEvent<HTMLTextAreaElement>,
  ) => {
    event.target.select();
  };

  const onEneterDownEventHandler = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleFormSubmitEvent(event);
      handleCancelationAddAnItem();
    }
    if (event.key === 'Escape') {
      handleCancelationAddAnItem();
    }
  };

  return (
    <Grid
      container
      size={18}
      columns={18}
      rowSpacing={1}
      component="form"
      onSubmit={onSubmitEventHandler}
    >
      <Grid size={1} />
      <Grid
        size={17}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <CardChecklistNameTextAreaStyled
          name="checklistItemName"
          autoFocus
          value={checklistItemName}
          placeholder={'and an new item'}
          onChange={onChangeEventHandler}
          onFocus={onFocusEventHandler}
          onKeyDown={onEneterDownEventHandler}
        />
      </Grid>
      <Grid size={1} />
      <Grid size={17}>
        <Stack direction="row" justifyContent="start" spacing={1}>
          <Button
            id="newChecklistItemSubmitButton"
            variant="contained"
            type="submit"
          >
            SAVE
          </Button>
          <Button variant="outlined" onClick={handleCancelationAddAnItem}>
            CANCLE
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CheckListAddItemFrom;
