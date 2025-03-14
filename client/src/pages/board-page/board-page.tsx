import React from 'react';
import {
  Box,
  Paper,
  Typography,
  useTheme,
  Button,
  IconButton,
  Toolbar,
  List,
} from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import api from '../../utils/calista-api';
import BoardDrawer from '../../components/boards-page-components/board-drawer/board-drawer';
// import BoardList from '../../components/boards-page-components/board-list/board-list';
import { HEADER } from '../../layout/config-layout';
import { TO_MAIN } from '../../utils/route-constants';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import {
  TitleTextAreaStyled,
  BoardsPageContent,
  BoardsPageContentPaperBar,
} from '../../components/boards-page-components/boards-page-styled-elements/boards-page-styled-elements';

const useBoardById = (id: string) => {
  return useQuery({
    queryKey: ['boardById', id],
    queryFn: () => api.boards.fetchBoardById(id),
  });
};

const BoardPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [addListEditMode, setAddListEditMode] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  const { id } = useParams();
  console.log(id);
  const { data, isSuccess } = useBoardById(id as string);
  const { spacing } = useTheme();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: api.boards.deleteBoard,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['boards'],
        exact: true,
      });
    },
  });

  const handleDeleteBoard = (): void => {
    mutate(id as string);
    navigate(TO_MAIN);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const AddList = addListEditMode ? (
    <Box
      sx={{
        width: spacing(34),
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: spacing(1),
      }}
    >
      <TitleTextAreaStyled
        autoFocus
        rows={1}
        value={newListTitle}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          setNewListTitle(event.target.value);
        }}
        onFocus={(event: React.FocusEvent<HTMLTextAreaElement>) => {
          event.target.select();
        }}
        onBlur={() => setAddListEditMode(false)}
      />
      <Box
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}
      >
        <Button>Add List</Button>
        <IconButton color="inherit" aria-label="list menu" onClick={() => {}}>
          <CloseIcon fontSize="medium" />
        </IconButton>
      </Box>
    </Box>
  ) : (
    <Paper sx={{ width: spacing(34), flexShrink: 0, height: spacing(4) }}>
      <Button fullWidth={true} onClick={() => setAddListEditMode(true)}>
        Add new list
      </Button>
    </Paper>
  );

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
          }}
        >
          {/* <ListItem>
            <BoardList title="to Do" id="test222_id" />
          </ListItem>
          <ListItem>
            <BoardList title="in progress" id="test222_id" />
          </ListItem>
          <ListItem>
            <BoardList title="to Do" id="test222_id" />
          </ListItem>
          <ListItem>
            <BoardList title="in progress" id="test222_id" />
          </ListItem>
          <ListItem>
            <BoardList title="to Do" id="test222_id" />
          </ListItem>
          <ListItem>
            <BoardList title="in progress" id="test222_id" />
          </ListItem>
          <ListItem>
            <BoardList title="in progress" id="test222_id" />
          </ListItem>
          <ListItem>
            <BoardList title="to Do" id="test222_id" />
          </ListItem>
          <ListItem>
            <BoardList title="in progress last" id="test222_id" />
          </ListItem> */}

          {AddList}
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
