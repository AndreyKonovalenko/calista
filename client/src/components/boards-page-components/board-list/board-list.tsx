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
import { useBoardStore} from '../../../services/boards/board-store';
import { useDrag, useDrop } from 'react-dnd';
import { calculateNewPosition } from '../../../utils/utils';
// import { useUpdateList } from '../../../api/lists-api-queries';

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



const BoardList = memo(function BaoardList (props: {
  name: string;
  id: string;
  pos: number;
  handleDeleteList: (id: string) => void;
  handleUpdateListName: (
    event: React.FormEvent<HTMLFormElement>,
    id: string,
  ) => void;
}) {
  const { name, id, handleDeleteList, handleUpdateListName, pos } = props;
  const { updateListNameBylistId, updateListPosByListId, lists } = useBoardStore(state => state);
  const [listName, setListName] = useState(name);
  const [editing, setEditing] = useState(false);
  const { spacing, palette } = useTheme();
  const cardsMoch: number[] = [1, 3, 4, 4, 4, 4, 4];
  const ref = useRef<HTMLDivElement>(null)
  // const updateListQuery = useUpdateList()

  type TMovableEelement = {
    id: string,
    pos: number,
    name: string
  }
  
//   const handleUpdateListPos = (listId: string, newPos: number) => {
//   updateListQuery.mutate({
//     id: listId, 
//     data:{pos: newPos}
//   })
// }



// const handleUpdateListName = (
//     event: React.FormEvent<HTMLFormElement>,
//     listId: string,
//   ) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     const listName = formData.get('listName');
//     const stateListName = getListNameFromState(lists, listId);
//     if (listName !== stateListName) {
//       updateListQuery.mutate({
//         id: listId,
//         data: { name: listName },
//       });
//     }
//   };



  const [{isDragging}, connectDrag] = useDrag({
    type: 'list',
    item: {id, pos, name},
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const [, connectDrop] = useDrop<TMovableEelement, unknown>({
    accept: 'list',
    // drop(item){
    //   if(item.id !== id){
    //    const newPos =  calculateNewPosition(lists, item.pos);
    //    updateListPosByListId(id, newPos)
    //   }

    // },
    hover({id: draggedId}){
      // // call reoreder action with dragPos and hoverPos args
      // const newPos = calculateNewPosition(lists, hoverPos)
      // updateListPosByListId(item.id, newPos)
      // // handleUpdateListPos(item.id, newPos)
      if(draggedId !== id) {
        const newPos = calculateNewPosition(lists, id)
        if(newPos) {
          updateListPosByListId(draggedId, newPos)
        }
      }
    }
  })

  const opacity = isDragging? 0 : 1
  connectDrag(ref);
  connectDrop(ref)

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
});

export default BoardList;
