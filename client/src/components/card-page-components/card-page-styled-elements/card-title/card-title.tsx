import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { CardNameTextAreaStyled } from '../card-page-styled-elements';
import { useCardActions } from '../../../../services/card-store';
import { useUpdateCard } from '../../../../api/cards-api-queries';
import { handleFormSubmitEvent } from '../../../../utils/utils';

const styles = {
  textarea: {
    box: {
      cursor: 'pointer',
    },
    typography: {
      overflow: 'hidden',
      overflowWrap: 'anywhere',
      resize: 'none',
    },
  },
};

const CardPageTitle = (props: { name: string; _id: string }) => {
  const { name, _id } = props;
  const { updateCardName } = useCardActions();
  const [cardName, setCardName] = useState(name);
  const [editing, setEditing] = useState(false);
  const updateListQuery = useUpdateCard();

  const handleUpdateCardName = (
    event: React.FormEvent<HTMLFormElement>,
    cardId: string,
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const cardName = formData.get('cardName');
    if (cardName !== name) {
      updateListQuery.mutate({
        id: cardId,
        data: { name: cardName },
      });
    }
  };

  useEffect(() => {
    if (cardName.length === 0) {
      setCardName(name);
    }
  }, [cardName]);

  return (
    <Box
      component="form"
      display="flex"
      flexGrow="1"
      flexDirection="column"
      justifyContent="center"
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        handleUpdateCardName(event, _id);
      }}
    >
      {editing ? (
        <CardNameTextAreaStyled
          name="cardName"
          autoFocus
          rows={1}
          value={cardName}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setCardName(event.target.value);
          }}
          onFocus={(event: React.FocusEvent<HTMLTextAreaElement>) => {
            event.target.select();
          }}
          onBlur={(event: React.FocusEvent<HTMLTextAreaElement>) => {
            handleFormSubmitEvent(event);
            updateCardName(_id, cardName);
            setEditing(false);
          }}
          onKeyDown={(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleFormSubmitEvent(event);
              updateCardName(_id, cardName);
              setEditing(false);
            }
          }}
        />
      ) : (
        <Box onClick={() => setEditing(true)} sx={styles.textarea.typography}>
          <Typography sx={styles.textarea.box} variant="h4">
            {cardName}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CardPageTitle;
