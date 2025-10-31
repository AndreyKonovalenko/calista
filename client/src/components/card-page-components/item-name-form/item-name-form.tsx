import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { CardChecklistNameTextAreaStyled } from '../card-page-styled-elements/card-page-styled-elements';
import { handleFormSubmitEvent } from '../../../utils/utils';

const styles = {
  textarea: {
    box: {
      cursor: 'edit',
    },
    typography: {
      overflow: 'hidden',
      overflowWrap: 'anywhere',
      resize: 'none',
    },
  },
};

const ItemNameForm = (props: {
  name: string;
  handleUpdateNameForm: (event: React.FormEvent<HTMLFormElement>) => void;
  handleUpdateName: (itemId: string, perantId: string) => void;
  itemId: string;
}) => {
  const { name, handleUpdateNameForm, handleUpdateName, itemId} = props;
  const [checklistName, setChecklistName] = useState(name);
  const [editing, setEditing] = useState(false);
  const handleSetEditing = () => {
    setEditing(true);
  };

  const onChangeEventHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setChecklistName(event.target.value);
  };
  const onFocusEventHandler = (
    event: React.FocusEvent<HTMLTextAreaElement>,
  ) => {
    event.target.select();
  };
  const onBlurEventHandler = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (checklistName.length === 0) {
      setChecklistName(name);
    }
    if (checklistName.length > 0 && checklistName !== name) {
      handleUpdateName(itemId, checklistName);
      handleFormSubmitEvent(event);
    }
    setEditing(false);
  };

  const onKeyDownEventHandler = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (checklistName.length === 0) {
        setChecklistName(name);
      }
      if (checklistName.length > 0 && checklistName !== name) {
        handleUpdateName(itemId, checklistName);
        handleFormSubmitEvent(event);
      }
      setEditing(false);
    }
    if (event.key === 'Escape') {
      setEditing(false);
    }
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    handleUpdateNameForm(event);
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      component="form"
      onSubmit={onSubmit}
    >
      {editing ? (
        <CardChecklistNameTextAreaStyled
          name="checklistName"
          autoFocus
          rows={1}
          value={checklistName}
          placeholder={name}
          onChange={onChangeEventHandler}
          onFocus={onFocusEventHandler}
          onBlur={onBlurEventHandler}
          onKeyDown={onKeyDownEventHandler}
        />
      ) : (
        <Stack
          direction="column"
          justifyContent="center"
          onClick={handleSetEditing}
        >
          <Typography
            sx={styles.textarea.box}
            variant="body1"
            fontSize="large"
            fontWeight="500"
          >
            {checklistName}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default ItemNameForm;
