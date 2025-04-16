import React, { useRef, memo } from 'react';
import { Box, useTheme, List, ListItem } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import CardComponent from '../card-component/card-component';
import { useBoardStore } from '../../../services/boards/board-store';
import { useDrop, XYCoord } from 'react-dnd';
import { calculateNewPosition } from '../../../utils/utils';
import { useUpdateList } from '../../../api/lists-api-queries';
import BoardListContent from './board-list-content';
// import { getEmptyImage } from 'react-dnd-html5-backend';

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
  const { name, id, pos, handleDeleteList, handleUpdateListName } = props;
  const { lists, updateListPosByListId } = useBoardStore(state => state);
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

  const [{ isOver, differenceOffset }, connectDrop] = useDrop<
    TMovableEelement,
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
        if (newPos) {
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
  const re = /\d+/;
  const found: RegExpMatchArray | null = spacing(34).match(re);

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
      found &&
      differenceOffset.x >= Number(found) / 2 &&
      isOver ? (
        dropGuide
      ) : (
        <BoardListContent
          pos={pos}
          name={name}
          id={id}
          handleDeleteList={handleDeleteList}
          handleUpdateListName={handleUpdateListName}
        >
          {cardsList}
        </BoardListContent>
      )}
    </Box>
  );
});

export default BoardList;
