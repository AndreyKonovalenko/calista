import React, { useRef, memo } from 'react';
import {
  Box,
  Button,
  Typography,
  useTheme,
  Stack,
  List,
  ListItem,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { TitleTextAreaStyled } from '../boards-page-styled-elements/boards-page-styled-elements';
import CardComponent from '../card-component/card-component';
import BoardListActionMenu from '../bpard-list-action-menu/board-list-action-menu';
import { useState } from 'react';
import { useBoardStore } from '../../../services/boards/board-store';
import { useDrag, useDrop } from 'react-dnd';
import { calculateNewPosition } from '../../../utils/utils';
import { useUpdateList } from '../../../api/lists-api-queries';
import { useBoardStore } from '../../../services/boards/board-store';
// import { getEmptyImage } from 'react-dnd-html5-backend';

const handleFormSubmitEvent = (
  event:
    | React.KeyboardEvent<HTMLTextAreaElement>
    | React.FocusEvent<HTMLTextAreaElement>,
) => {
  const formEvent = new Event('submit', {
    bubbles: true,
    cancelable: true,
  });
  event.currentTarget.form?.dispatchEvent(formEvent);
};

const BoardList = memo(function BaoardList(props: {
  name: string;
  id: string;
  pos: number;
  handleDeleteList: (id: string) => void;
  handleUpdateListName: (
    event: React.FormEvent<HTMLFormElement>,
    id: string,
  ) => void;
}) {
  const { name, id, handleDeleteList, handleUpdateListName } = props;
  const { updateListNameBylistId, lists, updateListPosByListId } =
    useBoardStore(state => state);
  const [listName, setListName] = useState(name);
  const [editing, setEditing] = useState(false);
  const { spacing, palette } = useTheme();
  const cardsMoch: number[] = [1, 3, 4, 4, 4, 4, 4];
  const ref = useRef<HTMLDivElement>(null);
  const updateListQuery = useUpdateList();

  type TMovableEelement = {
    id: string;
    name: string;
  };

  const handleUpdateListPos = (listId: string, newPos: number) => {
    updateListQuery.mutate({
      id: listId,
      data: { pos: newPos },
    });
  };

  const [{ isDragging }, connectDrag] = useDrag<
    TMovableEelement,
    unknown,
    { isDragging: boolean }
  >({
    type: 'list',
    item: { id, name },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;

  connectDrag(ref);

  // useEffect(() => {
  //   preview(getEmptyImage(), { captureDraggingState: true });
  // }, []);

  return (
    <Stack
      // ref={ref
      spacing={2}
      sx={{
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
      {cardsList}
      <Box>
        <Button>+ Add a card</Button>
      </Box>
    </Stack>
  );
});

export default BoardList;
