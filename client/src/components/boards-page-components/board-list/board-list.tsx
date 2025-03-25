import React, { useRef } from 'react';
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
import {DropTargetMonitor, useDrag, useDrop } from 'react-dnd';

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

const BoardList = (props: {
  name: string;
  id: string;
  pos: number;
  handleDeleteList: (id: string) => void;
  handleUpdateListName: (
    event: React.FormEvent<HTMLFormElement>,
    id: string,
  ) => void;
}) => {
  const { name, id, handleDeleteList, handleUpdateListName, pos } = props;
  const { updateListNameBylistId } = useBoardStore(state => state);
  const [listName, setListName] = useState(name);
  const [editing, setEditing] = useState(false);
  const { spacing, palette } = useTheme();
  const cardsMoch: number[] = [1, 3, 4, 4, 4, 4, 4];
  const ref = useRef<HTMLDivElement>(null)

  type TMovableEelement = {
    pos: number
  }
  
  const [{isDragging}, drag] = useDrag({
    type: 'list',
    item: {pos},
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const [, drop] = useDrop<TMovableEelement, unknown>({
    accept: 'list',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item:TMovableEelement, monitor: DropTargetMonitor){
      if(!ref.current){
        return;
      }
      const dragPos = item.pos;
      const hoverPos = pos;
      if (dragPos === hoverPos) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left)/2;
      const clientOffset = monitor.getClientOffset();
      if (clientOffset) {
        const hoverClientX = clientOffset.x - hoverBoundingRect.left;
        if(dragPos < hoverPos && hoverClientX < hoverMiddleX) {
          return;
        } 
        if (dragPos> hoverPos  && hoverClientX > hoverMiddleX) {
          return
        }
      }     
      // call reoreder action with dragPos and hoverPos args
      console.log(dragPos, hoverPos)
    }
  })




  const opacity = isDragging? 0 : 1
  drag(drop(ref))
  const cardsList =
    cardsMoch.length > 0 ? (
      <List
        sx={{
          display: 'flex',
          overflowX: 'auto',
          height: '100%',
          flexDirection: 'column',
          flex: '1 1 auto',
          scrollbarWidth: 'thin',
        }}
      >
        {cardsMoch.map((element, index) => (
          <ListItem key={uuidv4()} id={index.toString()}>
            <CardComponent text={element} />
          </ListItem>
        ))}
      </List>
    ) : null;

  return (
    <Box sx={{ width: spacing(34), height: '100%', opacity: opacity }} ref={ref}>
      <Stack
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
                onKeyDown={(
                  event: React.KeyboardEvent<HTMLTextAreaElement>,
                ) => {
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
    </Box>
  );
};

export default BoardList;
