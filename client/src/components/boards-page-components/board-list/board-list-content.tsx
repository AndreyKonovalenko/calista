import React, { useRef, memo, useEffect } from 'react';
import { Box, Button, Typography, useTheme, Stack } from '@mui/material';
import { TitleTextAreaStyled } from '../boards-page-styled-elements/boards-page-styled-elements';
import BoardListActionMenu from '../bpard-list-action-menu/board-list-action-menu';
import { useState } from 'react';
import { useDrag } from 'react-dnd';
import { useBoardStore } from '../../../services/boards/board-store';
import { handleFormSubmitEvent } from '../../../utils/utils';

import { getEmptyImage } from 'react-dnd-html5-backend';

const BoardListContent = memo(function BaoardListContent(props: {
  name: string;
  id: string;
  pos: number;
  children: React.ReactNode;
  handleDeleteList: (id: string) => void;
  handleUpdateListName: (
    event: React.FormEvent<HTMLFormElement>,
    id: string,
  ) => void;
}) {
  const { spacing, palette } = useTheme();
  const { name, id, children, handleDeleteList, handleUpdateListName } = props;
  const { updateListNameBylistId } = useBoardStore(state => state);
  const [listName, setListName] = useState(name);
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  type TMovableEelement = {
    id: string;
    name: string;
  };

  const [{ isDragging }, connectDrag, preview] = useDrag<
    TMovableEelement,
    unknown,
    { isDragging: boolean }
  >({
    type: 'list',
    item: {id, name},
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.3 : 1;
  connectDrag(ref);

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <Stack
      ref={ref}
      spacing={2}
      sx={{
        opacity: opacity,
        width: spacing(34),
        backgroundColor: palette.listBackground.main,
        borderRadius: spacing(2),
        maxHeight: '100%',
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
          <BoardListActionMenu id={id} handleDeleteList={handleDeleteList} />
        </Stack>
      </Box>
      {children}
      <Box>
        <Button>+ Add a card</Button>
      </Box>
    </Stack>
  );
});

export default BoardListContent;
