import React from 'react';
import {
  Box,
  Typography,
  Button,
  Popper,
  Fade,
  TextField,
  Paper,
} from '@mui/material';

type TBoardPopper = {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  handleCreateNewBoard: (event: React.FormEvent<HTMLFormElement>) => void;
};

const AddBoardPopper = (props: TBoardPopper) => {
  const { open, anchorEl, handleCreateNewBoard } = props;
  return (
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
              onSubmit={handleCreateNewBoard}
              noValidate
              sx={{ m: 2 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="text"
                label="Board name"
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
};

export default AddBoardPopper;
