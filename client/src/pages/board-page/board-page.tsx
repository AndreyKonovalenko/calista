import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Toolbar, Stack } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BoardDrawer from '../../components/boards-page-components/board-drawer/board-drawer';
import AddList from '../../components/boards-page-components/add-list/add-list';
import BoardList from '../../components/boards-page-components/board-list/board-list';
// import BoardCustomDragLayer from '../../components/boards-page-components/board-custom-drag-layer/board-custom-drag-layer';
import {
  BoardsPageContent,
  BoardsPageContentPaperBar,
} from '../../components/boards-page-components/boards-page-styled-elements/boards-page-styled-elements';
import {
  useFetchBoardById,
  useDeleteBoard,
} from '../../api/boards-api-queries';
import { useCreateList } from '../../api/lists-api-queries';
import { invariantId } from '../../utils/utils';
import { useBoardStore } from '../../services/boards/board-store';
import { useGlobalDrop } from '../../hooks/use-global-drop';
import { HEADER } from '../../layout/config-layout';
import { TO_MAIN } from '../../utils/route-constants';

const BoardPage = () => {
  useGlobalDrop();
  const navigate = useNavigate();
  const { name, lists, setBoardState } = useBoardStore(state => state);
  const deleteBoardQuery = useDeleteBoard();
  const createListQuery = useCreateList();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  invariantId(id);
  const { data, isSuccess, isLoading } = useFetchBoardById(id);

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
    let pos = 16384;
    if (lists.length > 0) {
      // when add element in the end of array
      const last = lists[lists.length - 1].pos;
      pos = pos + last;
    }
    const formData = new FormData(event.currentTarget);
    createListQuery.mutate({
      name: formData.get('newListName'),
      boardId: id,
      pos: pos,
    });
  };

  const boardLists = lists.map(element => {
    return (
      <Box key={uuidv4()}>
        <BoardList name={element.name} id={element._id} />
      </Box>
    );
  });

  useEffect(() => {
    if (isSuccess) setBoardState(data);
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
            {isLoading ? 'Loading' : null}
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
          <AddList handleCreateNewList={handleCreateNewList} />
        </Stack>
      </BoardsPageContent>
      <BoardDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleDeleteBoard={handleDeleteBoard}
      />
    </Box>
  );
};

export default BoardPage;
