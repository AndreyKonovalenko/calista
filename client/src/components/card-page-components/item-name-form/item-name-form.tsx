import React, { useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { CardChecklistNameTextAreaStyled } from '../card-page-styled-elements/card-page-styled-elements';
import { handleFormSubmitEvent } from '../../../utils/utils';
import { UseMutationResult } from '@tanstack/react-query';
import { TPutData } from '../../../api/calista-api';

const ItemNameForm = (props: {
  name: string;
  updateQuery: UseMutationResult<void, Error, TPutData, unknown>;
  handleUpdateName: (itemId: string, name: string) => void;
  itemId: string;
  fontStyle?: string;
}) => {
  const { name, updateQuery, handleUpdateName, itemId, fontStyle } = props;
  const [itemName, setItemName] = useState(name);
  const [editing, setEditing] = useState(false);
  const handleSetEditing = () => {
    setEditing(true);
  };

  const customStyle = {
    cursor: 'edit',
    fontWeight: fontStyle ? fontStyle : 'normal',
  };

  const handleUpdateNameForm = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const itemName = formData.get('itemName');
      updateQuery.mutate({
        id: itemId,
        data: { name: itemName },
      });
    },
    [itemId],
  );

  const onChangeEventHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setItemName(event.target.value);
  };
  const onFocusEventHandler = (
    event: React.FocusEvent<HTMLTextAreaElement>,
  ) => {
    event.target.select();
  };
  const onBlurEventHandler = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (itemName.length === 0) {
      setItemName(name);
    }
    if (itemName.length > 0 && itemName !== name) {
      handleUpdateName(itemId, itemName);
      handleFormSubmitEvent(event);
    }
    setEditing(false);
  };

  const onKeyDownEventHandler = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (itemName.length === 0) {
        setItemName(name);
      }
      if (itemName.length > 0 && itemName !== name) {
        handleUpdateName(itemId, itemName);
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
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      flexGrow="1"
      component="form"
      onSubmit={onSubmit}
    >
      {editing ? (
        <CardChecklistNameTextAreaStyled
          name="itemName"
          autoFocus
          value={itemName}
          placeholder={name}
          onChange={onChangeEventHandler}
          onFocus={onFocusEventHandler}
          onBlur={onBlurEventHandler}
          onKeyDown={onKeyDownEventHandler}
        />
      ) : (
        <Box onClick={handleSetEditing}>
          <Typography sx={customStyle} variant="body1" fontSize="large">
            {itemName}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ItemNameForm;
