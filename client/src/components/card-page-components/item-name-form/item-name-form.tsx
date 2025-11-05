import React, { useState, useCallback } from 'react';
import { Stack, Typography } from '@mui/material';
import { CardChecklistNameTextAreaStyled } from '../card-page-styled-elements/card-page-styled-elements';
import { handleFormSubmitEvent } from '../../../utils/utils';
import { UseMutationResult  } from '@tanstack/react-query';
import { TPutData } from '../../../api/calista-api';

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
  width: {
    width: '256px',
    height: '20px'
  }

};

const ItemNameForm = (props: {
  name: string;
  updateQuery: UseMutationResult<void, Error, TPutData, unknown>;
  handleUpdateName: (itemId: string, name: string) => void;
  itemId: string;
}) => {
  const { name, updateQuery, handleUpdateName, itemId} = props;
  const [checklistName, setChecklistName] = useState(name);
  const [editing, setEditing] = useState(false);
  const handleSetEditing = () => {
    setEditing(true);
  };

const handleUpdateNameForm = useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const checklistName = formData.get('itemName');
        updateQuery.mutate({
          id: itemId,
          data: { name: checklistName },
        });
      },
      [itemId],
    );
  

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
          name="itemName"
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
          sx={styles.width}
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
