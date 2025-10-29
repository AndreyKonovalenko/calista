import React from 'react';
import { Typography, Grid, Stack, IconButton } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const styles = {
  cursor: {
    cursor: 'pointer',
  },
  itemBody: {
    pl: 1,
    pr: 1,
    pt: 0.5,
    pb: 0.5,
    '&:hover': {
      backgroundColor: 'listBackground.main',
      borderRadius: 2,
    },
  },
};

const ChecklistItemContent = (props: {
  name: string;
  state: 'incomplite' | 'complite';
  handleChangeItemState: () => void;
}) => {
  const { name, state, handleChangeItemState } = props;
  return (
    <Grid container size={18} columns={18} rowSpacing={1}>
      <Grid
        size={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        onClick={handleChangeItemState}
        sx={styles.cursor}
      >
        {state == 'incomplite' ? (
          <CheckBoxOutlineBlank color="primary" fontSize="small" />
        ) : (
          <CheckBoxIcon color="primary" fontSize="small" />
        )}
      </Grid>
      <Grid size={17} sx={styles.itemBody}>
        <Stack
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body1" fontSize="large">
            {name}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open item action"
            onClick={() => {}}
          >
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ChecklistItemContent;
