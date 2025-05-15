import React, { useState, useRef } from 'react';
import { Box, Button, IconButton, useTheme } from '@mui/material';
import { TitleTextAreaStyled } from '../boards-page-styled-elements/boards-page-styled-elements';
import CloseIcon from '@mui/icons-material/Close';
import { useOutsideEClickEvent } from '../../../hooks/useOutsideClickEvent';

type TAddItem = {
  name: string,
  handleCreateItem: (event: React.FormEvent<HTMLFormElement>) => void;
  itemType: string,
  labelPosition: 'center' | 'flex-start'
};

const AddItem = (props: TAddItem) => {
  const { handleCreateItem, name, itemType, labelPosition} = props;
  const { spacing } = useTheme();
  const [newListName, setNewListName] = useState('');
  const [addListEditMode, setAddListEditMode] = useState(false);
  const ref = useRef(null);

  const clickOutside = () => {
    console.log('click outside');
    setAddListEditMode(false);
  };

  useOutsideEClickEvent(ref, clickOutside);

  return addListEditMode ? (
    <Box sx={{ height: '100%', width: spacing(34), paddingLeft: spacing(1), paddingRight: spacing(1)}}>
      <Box
        component="form"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          handleCreateItem(event);
          setNewListName('');
        }}
        sx={{
          width: '100%',
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          gap: spacing(1),
        }}
      >
        <TitleTextAreaStyled
          autoFocus
          rows={1}
          value={newListName}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setNewListName(event.target.value);
          }}
          onFocus={(event: React.FocusEvent<HTMLTextAreaElement>) => {
            event.target.select();
          }}
          onBlur={(event: React.FocusEvent<HTMLTextAreaElement>) => {
            event.target.focus();
          }}
          name="newListName"
          onKeyDown={(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              const formEvent = new Event('submit', {
                bubbles: true,
                cancelable: true,
              });
              event.currentTarget.form?.dispatchEvent(formEvent);
            }
          }}
        />
        <Box
          sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}
        >
          <Button type="submit" ref={ref}>
            Add {itemType}
          </Button>
          <IconButton
            color="inherit"
            aria-label="list menu"
            onClick={() => setAddListEditMode(false)}
          >
            <CloseIcon fontSize="medium" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  ) : (
      <Button fullWidth={true} onClick={() => setAddListEditMode(true)} sx={{justifyContent: labelPosition}}>
        {name}
      </Button>
  );
};

export default AddItem;
