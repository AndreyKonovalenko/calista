import React, { FormEvent } from 'react';
import { Box, Typography, useTheme, Stack } from '@mui/material';
import { TitleTextAreaStyled } from '../boards-page-styled-elements/boards-page-styled-elements';
import BoardListActionMenu from '../board-list-action-menu/board-list-action-menu';
import { useState } from 'react';
// import { useBoardStore } from '../../../services/boards/board-store';
import { handleFormSubmitEvent } from '../../../utils/utils';
// import { useUpdateList } from '../../../api/lists-api-queries';
import AddItem from '../add-item/add-item';

const BoardListContent = (props: {
  _id: string;
  name: string;
  handleCreateNewCard: (event: FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}) => {
  const { spacing, palette } = useTheme();
  const { name, _id, children, handleCreateNewCard } = props;
  // const { updateListNameBylistId, lists } = useBoardStore(state => state);
  const [listName, setListName] = useState(name);
  const [editing, setEditing] = useState(false);

  // const updateListQuery = useUpdateList();

  const handleUpdateListName = (
    event: React.FormEvent<HTMLFormElement>,
    listId: string,
  ) => {
    event.preventDefault();
    console.log(listId)
    // const formData = new FormData(event.currentTarget);
    // const listName = formData.get('listName');l
    // const stateListName = lists[listId].name;
    // if (listName !== stateListName) {
    //   updateListQuery.mutate({
    //     id: listId,
    //     data: { name: listName },
    //   });
    // }
  };

  return (
    <Stack
      spacing={2}
      sx={{
        backgroundColor: palette.listBackground.main,
        borderRadius: 'inherit',
        width: '100%',
        position: 'relative',
        flexShrink: 0,
      }}
    >
      <Box
        sx={{ pl: spacing(2), pt: spacing(2), pr: spacing(2) }}
        component="form"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          console.log()
           handleUpdateListName(event, _id);
        }}
      >
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          {editing ? (
            <TitleTextAreaStyled
              name="listName"
              autoFocus
              rows={1}
              value={listName}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                setListName(event.target.value);
              }}
              onFocus={(event: React.FocusEvent<HTMLTextAreaElement>) => {
                event.target.select();
              }}
              onBlur={(event: React.FocusEvent<HTMLTextAreaElement>) => {
                handleFormSubmitEvent(event);
                // updateListNameBylistId(_id, listName);
              }}
              onKeyDown={(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
                if (event.key === 'Enter') {
                  handleFormSubmitEvent(event);
                  // updateListNameBylistId(_id, listName);
                }
              }}
            />
          ) : (
            <Box onClick={() => setEditing(true)} sx={{ cursor: 'pointer' }}>
              <Typography
                sx={{
                  overflow: 'hidden',
                  overflowWrap: 'anywhere',
                  resize: 'none',
                }}
                variant="h6"
              >
                {listName}
              </Typography>
            </Box>
          )}
          <BoardListActionMenu _id={_id} />
        </Stack>
      </Box>
      {children}
      <AddItem
        handleCreateItem={handleCreateNewCard}
        name="+ ADD A CARD"
        itemType="CARD"
        labelPosition="flex-start"
      />
    </Stack>
  );
};

export default BoardListContent;
