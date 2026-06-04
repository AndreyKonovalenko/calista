import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, IconButton, Toolbar, Stack } from '@mui/material';
import { useParams, useNavigate } from 'react-router';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BoardDrawer from '../../components/boards-page-components/board-drawer/board-drawer';
import AddItem from '../../components/boards-page-components/add-item/add-item';
import BoardList from '../../components/boards-page-components/board-list/board-list';
import LoadingBage from '../../components/loading-bage/loading-bage';
import {
  BoardsPageContent,
  BoardsPageContentPaperBar,
} from '../../components/boards-page-components/boards-page-styled-elements/boards-page-styled-elements';
import {
  useFetchBoardById,
  useDeleteBoard,
} from '../../api/boards-api-queries';
import { useCreateList } from '../../api/lists-api-queries';
import { useBoardName, useBoardActions } from '../../services/board-store';
import { HEADER } from '../../layouts/config-layout';
import { TO_MAIN } from '../../utils/route-constants';
import {
  useLists,
  useListActions,
  useSortedLists,
} from '../../services/list-store';
import { useCardActions } from '../../services/card-store';
import { useChecklistActions } from '../../services/checklist-store';
import { useChecklistItemActions } from '../../services/checklist-item-store';
import { ROUTES } from '../../utils/router-paths';
import { TApiListPayload } from '../../api/api';

const BoardPage = () => {
  const navigate = useNavigate();
  const name = useBoardName();
  const deleteBoardQuery = useDeleteBoard();
  const createListQuery = useCreateList();
  const [open, setOpen] = useState(false);
  const { boardId } = useParams();

  // Move all hooks BEFORE conditional returns
  const { data, isSuccess, isLoading } = useFetchBoardById(boardId || '');
  const lists = useLists();
  const sortedList = useSortedLists();
  const { setBoard } = useBoardActions();
  const { setLists } = useListActions();
  const { setCards } = useCardActions();
  const { setChecklists } = useChecklistActions();
  const { setChecklistItems } = useChecklistItemActions();

  // Now conditional return

  if (!boardId) {
    return <LoadingBage />; // Or navigate to 404
  }

  const handleDeleteBoard = (): void => {
    deleteBoardQuery.mutate();
    navigate(ROUTES.MAIN);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCreateNewList = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      let pos = 16384;
      if (lists && sortedList && sortedList?.length > 0) {
        pos = lists[sortedList[sortedList.length - 1]].pos + pos;
      }
      const listPayload: TApiListPayload = {
        boardId: boardId,
        name: formData.get('name')?.toString() || '',
        pos: pos,
      };
      createListQuery.mutate(listPayload);
    },
    [createListQuery],
  );

  const boardLists = sortedList
    ? sortedList.map(key => {
        return <BoardList listId={key} key={key} boardId={boardId} />;
      })
    : null;

  useEffect(() => {
    if (isSuccess) {
      if (!data.board) {
        navigate(TO_MAIN);
      }
      if (data.board) {
        const { board, lists, cards, checklists, checklistItems } = data;
        setBoard(board);
        setLists(lists);
        setCards(cards);
        setChecklists(checklists);
        setChecklistItems(checklistItems);
      }
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
