import React from 'react';
import { useState } from 'react';
import { Box, Card, Divider, Typography, Button, Stack } from '@mui/material';
import { Person } from '@mui/icons-material';
import BoardCard from '../../components/main-page-components/board-card/board-card';
import AddBoardPopper from '../../components/main-page-components/add-baard-popper/add-board-popper';
import { v4 as uuidv4 } from 'uuid';
// import useSse from '../../hooks/useSse';
import { useEscapeKey } from '../../hooks/use-escape-key';
import { useFetchBoards, useCreateBoard } from '../../api/boards-api-queries';

const MainPage = () => {
  // useSse();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const { data } = useFetchBoards();
  const { mutate } = useCreateBoard();

  const handleCreateNewBoard = (event: React.FormEvent<HTMLFormElement>) => {
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
    ? data.map(element => (
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

  const AddBoradCard = (
    <>
      <AddBoardPopper
        open={open}
        anchorEl={anchorEl}
        handleCreateNewBoard={handleCreateNewBoard}
      />
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
