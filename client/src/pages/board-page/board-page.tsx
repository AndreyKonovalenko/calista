import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Toolbar, Stack } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BoardDrawer from '../../components/boards-page-components/board-drawer/board-drawer';
import AddItem from '../../components/boards-page-components/add-item/add-item';
import BoardList from '../../components/boards-page-components/board-list/board-list';
import LoadingBage from '../../components/loading-bage/loading-bage';
// import BoardCustomDragLayer from '../../components/boards-page-components/board-custom-drag-layer/board-custom-drag-layer';
import {
  BoardsPageContent,
  BoardsPageContentPaperBar,
} from '../../components/boards-page-components/boards-page-styled-elements/boards-page-styled-elements';
import {
  useFetchBoardById,
  useDeleteBoard,
} from '../../api/boards-api-queries';
// import { useCreateList } from '../../api/lists-api-queries';
import { invariantId } from '../../utils/utils';
import { useBoardName, useBoardActions } from '../../services/board-store';
// import { useGlobalDrop } from '../../hooks/use-global-drop';
import { HEADER } from '../../layout/config-layout';
import { TO_MAIN } from '../../utils/route-constants';
import { useListActions,  } from '../../services/list-store';
import { useSortedLists } from '../../services/list-store';

const BoardPage = () => {
  // useGlobalDrop();
  const navigate = useNavigate();
  const name = useBoardName();
  const deleteBoardQuery = useDeleteBoard();
  // const createListQuery = useCreateList();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  invariantId(id);
  const { data, isSuccess, isLoading } = useFetchBoardById(id);
  const sorterLists = useSortedLists()
  const { setBoard } = useBoardActions();
  const { setLists } = useListActions();
  const handleDeleteBoard = (): void => {
    deleteBoardQuery.mutate(id);
    navigate(TO_MAIN);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCreateNewList = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // let pos = 16384;
    // const keysArr = Object.keys(lists);
    // if (keysArr.length > 0) {
    //   keysArr.sort((a, b) => {
    //     if (lists[a].pos < lists[b].pos) return -1;
    //     if (lists[a].pos > lists[b].pos) return 1;
    //     return 0;
    //   });
    //   const last = lists[keysArr[keysArr.length - 1]].pos;
    //   pos = pos + last;
    // }
    // const formData = new FormData(event.currentTarget);
    // createListQuery.mutate({
    //   name: formData.get('newItemName'),
    //   boardId: id,
    //   pos: pos,
    // });
  };

  const boardLists = sorterLists ? sorterLists.map(key => {
        return <BoardList _id={key} key={uuidv4()} />;
      })
    : null;

  useEffect(() => {
    console.log('render');
    if (isSuccess) {
      const { board, lists } = data;
      setBoard(board);
      setLists(lists);
      // setListState(lists)
      // setCardsState(cards)
    }
  }, [data, isSuccess]);

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <BoardsPageContentPaperBar open={open}>
        <Toolbar>
          <Typography variant="h6" component="div" noWrap sx={{ flexGrow: 1 }}>
            {name}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MoreHorizIcon fontSize="medium" />
          </IconButton>
        </Toolbar>
      </BoardsPageContentPaperBar>
      {isLoading ? (
        <LoadingBage />
      ) : (
        <BoardsPageContent
          open={open}
          sx={{ mt: `${HEADER.H_DESKTOP}px`, position: 'relative' }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
              p: 2,
              display: 'flex',
              overflowX: 'auto',
              position: 'absolute',
              justifyContent: 'flex-start',
              alignItems: 'stretch',
            }}
          >
            {boardLists}
            {/* <BoardCustomDragLayer /> */}
            <AddItem
              handleCreateItem={handleCreateNewList}
              name="ADD NEW LIST"
              itemType="LIST"
              labelPosition="center"
            />
          </Stack>
        </BoardsPageContent>
      )}
      <BoardDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleDeleteBoard={handleDeleteBoard}
      />
    </Box>
  );
};

export default BoardPage;
