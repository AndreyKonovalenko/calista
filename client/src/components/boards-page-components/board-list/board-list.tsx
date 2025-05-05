import React, { useRef, memo} from 'react';
import { Box, useTheme, List, ListItem } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import CardComponent from '../card-component/card-component';
import { useBoardStore, getListNameFromState } from '../../../services/boards/board-store';
import { useDrop, XYCoord } from 'react-dnd';
import { useUpdateList } from '../../../api/lists-api-queries';
import { useReNumListsPosInBoard } from '../../../api/boards-api-queries';
import BoardListContent from './board-list-content';
import { calculateNewPosition } from '../../../utils/utils';
import BoardListDraggable from './board-list-draggable';

// import BoardListCustomDragLayer from './board-list-custom-drag-layer';

const BoardList = memo(function BaoardList(props: {
  name: string;
  id: string;
  pos: number;
}) {
  const { name, id } = props;
  const {_id, lists, updateListPosByListId} = useBoardStore(state => state);
  const { spacing, palette } = useTheme();
  const cardsMoch: number[] = [1, 3, 4, 4, 4, 4, 4];
  const ref = useRef<HTMLDivElement>(null);
  const updateListQuery = useUpdateList();
  const updateBoardById = useReNumListsPosInBoard(_id)

  type TMovableElement = {
    id: string;
  };

  const handleUpdateListPos = (listId: string, newPos: number) => {
    updateListQuery.mutate({
      id: listId,
      data: { pos: newPos },
    });
  };

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

  const [{ isOver, differenceOffset }, connectDrop] = useDrop<
    TMovableElement,
    unknown,
    {
      isOver: boolean;
      differenceOffset: XYCoord | null;
    }
  >({
    accept: 'list',
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const newPos = calculateNewPosition(lists, id, draggedId);
        if (newPos === -1) {
          updateBoardById.mutate({id: _id, data: {action: 'renumbering'}})
        }
        if (newPos && newPos !== -1) {
          updateListPosByListId(draggedId, newPos);
          handleUpdateListPos(draggedId, newPos);
        }
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      item: monitor.getItem(),
      differenceOffset: monitor.getDifferenceFromInitialOffset(),
    }),
  });

  connectDrop(ref);
  // mui spacing = 8; list width = spacin(34) = 272
  const threshold: number = 272 * 0.5;

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

  const dropGuide = (
    <Box
      sx={{
        width: spacing(34),
        height: '100%',
        borderRadius: spacing(2),
        opacity: '0.8',
        backgroundColor: palette.dropGuideColor.main,
      }}
    />
  );

  return (
    <Box
      sx={{
        width: spacing(34),
        height: '100%',
        borderRadius: spacing(2),
      }}
      ref={ref}
    >
      {differenceOffset &&
      Math.abs(differenceOffset.x) >= threshold &&
      isOver ? (
        dropGuide
      ) : (
        <BoardListDraggable id={id}>
          <BoardListContent
            name={name}
            id={id}
            handleUpdateListName={handleUpdateListName}
          >
            {cardsList}
          </BoardListContent>
        </BoardListDraggable>
      )}
      {/* <BoardListCustomDragLayer id={id} />  */}
    </Box>
  );
});

export default BoardList;
