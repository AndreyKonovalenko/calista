import React, { useCallback } from 'react';
import { Grid, Stack, Button } from '@mui/material';
import { useParams } from 'react-router';
import { CardChecklistNameTextAreaStyled } from '../card-page-styled-elements/card-page-styled-elements';
import { useCreateChecklistItem } from '../../../api/checklist-items-api-queries';

const CheckListAddItemFrom = (props: {
  _id: string;
  handleCancelationAddAnItem: () => void;
}) => {
  const { boardId, listId, id } = useParams();
  if (!id || !boardId || !listId) {
    return null;
  }

  const { _id, handleCancelationAddAnItem } = props;
  const createChecklistItemQuery = useCreateChecklistItem();

  const handleAddNewChecklistItem = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      let pos = 16584;
      if (checklists && sortedChecklists && sortedChecklists?.length > 0) {
        pos =
          checklists[sortedChecklists[sortedChecklists.length - 1]].pos + pos;
      }
      const formData = new FormData(event.currentTarget);
      createChecklistItemQuery.mutate({
        name: formData.get('newItemName'),
        boardId: boardId,
        listId: listId,
        cardId: id,
        checklistId: _id,
        pos: pos,
      });
    },
    [id, checklists, sortedChecklists],
  );

  // const onSubmitEventHandler = (event: React.FormEvent<HTMLFormElement>) => {
  //   handleAddNewChecklist(event);
  // };

  // const onChangeEventHandler = (
  //   event: React.ChangeEvent<HTMLTextAreaElement>,
  // ) => {
  //   setChecklistName(event.target.value);
  // };

  // const onFocusEventHandler = (
  //   event: React.FocusEvent<HTMLTextAreaElement>,
  // ) => {
  //   event.target.select();
  // };

  // const onBlurEventHandler = (event: React.FocusEvent<HTMLTextAreaElement>) => {
  //   const submitButton = document.getElementById('newChecklistSubmitButton');
  //   if (event.relatedTarget === submitButton) {
  //     return;
  //   }
  // };

  // const onEneterDownEventHandler = (
  //   event: React.KeyboardEvent<HTMLTextAreaElement>,
  // ) => {
  //   if (event.key === 'Enter') {
  //     event.preventDefault();
  //     handleFormSubmitEvent(event);
  //     closeAddChecklistMenu();
  //   }
  //   if (event.key === 'Escape') {
  //     closeAddChecklistMenu();
  //   }

  return (
    <Grid
      container
      size={18}
      columns={18}
      rowSpacing={1}
      component="form"
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        console.log(event);
        handleAddNewChecklistItem(event);
        // setDescriptionEdit(false);
      }}
    >
      <Grid size={1} />
      <Grid
        size={17}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <CardChecklistNameTextAreaStyled
          name="newItemName"
          autoFocus
          rows={1}
          value={'newIem name'}
          placeholder={'and an new item'}
          onChange={() => {}}
          onFocus={() => {}}
          onBlur={() => {}}
          onKeyDown={() => {}}
        />
      </Grid>
      <Grid size={1} />
      <Grid size={17}>
        <Stack direction="row" justifyContent="start" spacing={1}>
          <Button variant="contained" type="submit">
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
