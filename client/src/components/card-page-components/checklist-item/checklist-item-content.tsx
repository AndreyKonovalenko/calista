import React from "react";
import { Typography } from "@mui/material";

const ChecklistItemContent = (props: {name: string}) => {
  const {name} = props;
  return( 
    <Typography  variant="h6">
      {name}
    </Typography>)
}

export default ChecklistItemContent