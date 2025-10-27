import React from 'react';
import { Typography, Grid } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';

const styles = {
  cursor: {
    cursor: 'pointer',
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
      <Grid size={17}>
        <Typography variant="h6">{name}</Typography>
      </Grid>
    </Grid>
  );
};

export default ChecklistItemContent;
