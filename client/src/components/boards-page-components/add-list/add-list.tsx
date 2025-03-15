import React, { useState } from 'react';
import { Box, Button, Paper, IconButton, useTheme } from '@mui/material';
import { TitleTextAreaStyled } from '../boards-page-styled-elements/boards-page-styled-elements';
import CloseIcon from '@mui/icons-material/Close';

type TAddList = {
  handleCreateNewList: (event: React.FormEvent<HTMLFormElement>) => void;
};
const AddList = (props: TAddList) => {
  const { spacing } = useTheme();
  const [newListTitle, setNewListTitle] = useState('');
  const [addListEditMode, setAddListEditMode] = useState(false);
  return addListEditMode ? (
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
};

export default AddList;
