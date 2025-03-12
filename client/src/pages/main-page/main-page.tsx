import React from 'react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import api from '../../utils/calista-api';
import {
  Box,
  Card,
  Divider,
  Typography,
  Button,
  Popper,
  Fade,
  Stack,
  TextField,
  Paper,
} from '@mui/material';
import { Person } from '@mui/icons-material';
import BoardCard from '../../components/main-page-components/board-card/board-card';
import { v4 as uuidv4 } from 'uuid';
import { TBoard } from '../../services/boards/board-store';
// import useSse from '../../hooks/useSse';
import { useEscapeKey } from '../../hooks/use-escape-key';

const useBoards = () => {
  return useQuery({
    queryKey: ['boards'],
    queryFn: api.boards.fetchBoards,
  });
};

const MainPage = () => {
  // useSse();

  const queryClient = useQueryClient();
  const { data } = useBoards();
  const { mutate } = useMutation({
    mutationFn: api.boards.createBoard,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['boards'],
        exact: true,
      });
    },
  });
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleCreateNewBoardSubmit = (
    event: React.FocusEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    mutate({ name: data.get('text') });
  };
  const handleAddBoardMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
    setOpen(previeousOpen => !previeousOpen);
  };
  const handleAddBoardMenuClose = () => {
    setOpen(false);
  };
  useEscapeKey(handleAddBoardMenuClose);
  const boards = data
    ? data.map((element: TBoard) => (
        <BoardCard name={element.name} id={element._id} key={uuidv4()} />
      ))
    : [];

  // useEffect(()=>{
  //   const evtSource = api.sse.setConnection()
  //   // const evtSource = api.sse.setConnection()
  //   evtSource.onopen = () => console.log(">>> Connection open",  evtSource.readyState)
  //   evtSource.onerror = (err) => console.log("Error",err)
  //   ref.current = evtSource;
  //   return () => {
  //     console.log('close connetion')
  //     evtSource.close()
  //   }
  // },[])

  const AddBoardPopper = (
    <Popper
      sx={{ zIndex: 1200 }}
      open={open}
      anchorEl={anchorEl}
      placement={'right'}
      transition
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper sx={{ m: 2 }}>
            <Typography sx={{ p: 2 }}>Create Board</Typography>
            <Box
              component="form"
              onSubmit={handleCreateNewBoardSubmit}
              noValidate
              sx={{ m: 2 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="text"
                label="Board title"
                name="text"
                autoComplete="text"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create
              </Button>
            </Box>
          </Paper>
        </Fade>
      )}
    </Popper>
  );

  const AddBoradCard = (
    <>
      {AddBoardPopper}
      <Card sx={{ minWidth: 180, minHeight: 100 }}>
        <Button
          sx={{ minHeight: 'inherit' }}
          fullWidth={true}
          onClick={handleAddBoardMenuOpen}
        >
          {' '}
          Create new board{' '}
        </Button>
      </Card>
    </>
  );

  return (
    <Box sx={{ margin: 10 }}>
      <Stack direction="row" spacing={2}>
        <Person
          fontSize="large"
          sx={theme => ({
            color: theme.palette.text.secondary,
          })}
        />
        <Typography
          variant="h6"
          sx={theme => ({
            color: theme.palette.text.secondary,
          })}
        >
          {' '}
          Your boards
        </Typography>
      </Stack>
      <Divider />
      <Stack
        mt={6}
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 1, md: 4 }}
        justifyContent="left"
        flexWrap="wrap"
        useFlexGap
      >
        {boards}
        {AddBoradCard}
      </Stack>
    </Box>
  );
};
export default MainPage;
