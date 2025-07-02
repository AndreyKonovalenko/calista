import React, { FormEvent } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { TitleTextAreaStyled } from '../boards-page-styled-elements/boards-page-styled-elements';
import BoardListActionMenu from '../board-list-action-menu/board-list-action-menu';
import { useState } from 'react';
import { useListActions } from '../../../services/list-store';
import { handleFormSubmitEvent } from '../../../utils/utils';
import { useUpdateList } from '../../../api/lists-api-queries';
import AddItem from '../add-item/add-item';

const styles = {
  container: {
    stack: {
      backgroundColor: 'listBackground.main',
      borderRadius: 'inherit',
      width: '100%',
      position: 'relative',
      flexShrink: 0,
    },
    box: {
      pl: 2,
      pt: 2,
      pr: 2,
    },
  },
  textarea: {
    box: {
      cursor: 'pointer',
    },
    typography: {
      overflow: 'hidden',
      overflowWrap: 'anywhere',
      resize: 'none',
    },
  },
};

const BoardListContent = (props: {
  _id: string;
  name: string;
  handleCreateNewCard: (event: FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}) => {
  const { name, _id, children, handleCreateNewCard } = props;
  const { updateListNameBylistId } = useListActions();
  const [listName, setListName] = useState(name);
  const [editing, setEditing] = useState(false);

  const updateListQuery = useUpdateList();

  const handleUpdateListName = (
    event: React.FormEvent<HTMLFormElement>,
    listId: string,
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const listName = formData.get('listName');
    console.log(name, listName);
    if (listName !== name) {
      updateListQuery.mutate({
        id: listId,
        data: { name: listName },
      });
    }
  };

  return (
    <Stack spacing={2} sx={styles.container.stack}>
      <Box
        sx={styles.container.box}
        component="form"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
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
                updateListNameBylistId(_id, listName);
                setEditing(false);
              }}
              onKeyDown={(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleFormSubmitEvent(event);
                  updateListNameBylistId(_id, listName);
                  setEditing(false);
                }
              }}
            />
          ) : (
            <Box
              onClick={() => setEditing(true)}
              sx={styles.textarea.typography}
            >
              <Typography sx={styles.textarea.box} variant="h6">
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
