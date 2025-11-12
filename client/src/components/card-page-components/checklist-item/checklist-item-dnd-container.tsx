import React, { memo } from 'react';
import { Box } from '@mui/material';

const ChecklistItemDndContainer = memo(
  function ChecklistItemDndContainer(props: { children: React.ReactNode }) {
    const { children } = props;
    return <Box>{children}</Box>;
  },
);

export default ChecklistItemDndContainer;
