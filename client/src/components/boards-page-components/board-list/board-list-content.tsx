import React from 'react';
import { Box, Typography, useTheme, Stack } from '@mui/material';
import { TitleTextAreaStyled } from '../boards-page-styled-elements/boards-page-styled-elements';
import BoardListActionMenu from '../bpard-list-action-menu/board-list-action-menu';
import { useState } from 'react';
import {
  useBoardStore,
  getListNameFromState,
} from '../../../services/boards/board-store';
import { handleFormSubmitEvent } from '../../../utils/utils';
import { useUpdateList } from '../../../api/lists-api-queries';
import AddItem from '../add-item/add-item';

import { useCreateCard } from '../../../api/cards-api-queries';

const BoardListContent = (props: {
  name: string;
  id: string;
  children: React.ReactNode;
  cards: Array<{ _id: string; name: string; pos: number }>;
}) => {
  const { spacing, palette } = useTheme();
  const { name, id, children, cards } = props;
  const { updateListNameBylistId, lists, _id } = useBoardStore(state => state);
  const [listName, setListName] = useState(name);
  const [editing, setEditing] = useState(false);

  const updateListQuery = useUpdateList();
  const createCardQuery = useCreateCard();
  const handleUpdateListName = (
    event: React.FormEvent<HTMLFormElement>,
    listId: string,
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const listName = formData.get('listName');
    const stateListName = getListNameFromState(lists, listId);
    if (listName !== stateListName) {
      updateListQuery.mutate({
        id: listId,
        data: { name: listName },
      });
    }
  };

  const handleCreateNewCard = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let pos = 16384;
    if (cards.length > 0) {
      // when add element in the end of array
      const last = cards[cards.length - 1].pos;
      pos = pos + last;
    }
    const formData = new FormData(event.currentTarget);
    createCardQuery.mutate({
      name: formData.get('newItemName'),
      boardId: _id,
      listId: id,
      pos: pos,
    });
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
          handleUpdateListName(event, id);
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
                updateListNameBylistId(id, listName);
              }}
              onKeyDown={(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
                if (event.key === 'Enter') {
                  handleFormSubmitEvent(event);
                  updateListNameBylistId(id, listName);
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
          <BoardListActionMenu id={id} />
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
