import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Toolbar,
  List,
  ListItem,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BoardDrawer from '../../components/boards-page-components/board-drawer/board-drawer';
import AddList from '../../components/boards-page-components/add-list/add-list';
import { HEADER } from '../../layout/config-layout';
import { TO_MAIN } from '../../utils/route-constants';
import {
  BoardsPageContent,
  BoardsPageContentPaperBar,
} from '../../components/boards-page-components/boards-page-styled-elements/boards-page-styled-elements';
import {
  useFetchBoardById,
  useDeleteBoard,
} from '../../api/boards-api-queries';
import { useCreateList, useDeleteList } from '../../api/lists-api-queries';
import BoardList from '../../components/boards-page-components/board-list/board-list';

const BoardPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { data, isSuccess } = useFetchBoardById(id);
  const deleteBoardQuery = useDeleteBoard();
  const createListQuery = useCreateList(id);
  const deleteListQuery = useDeleteList(id);

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
    const data = new FormData(event.currentTarget);
    createListQuery.mutate({ name: data.get('listName'), boardId: id });
  };

  const handleDeleteList = (listId: string | undefined) => {
    deleteListQuery.mutate(listId);
  };

  const lists = data
    ? data.lists.map(element => {
        return (
          <ListItem key={uuidv4()}>
            <BoardList
              name={element.name}
              id={element._id}
              handleDeleteList={handleDeleteList}
            />
          </ListItem>
        );
      })
    : [];

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
            {isSuccess ? data.name : ''}
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
        <List
          sx={{
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            p: 2,
            display: 'flex',
            overflowX: 'auto',
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}
        >
          {lists}
          <AddList handleCreateNewList={handleCreateNewList} />
        </List>
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
