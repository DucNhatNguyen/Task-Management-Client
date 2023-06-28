import React from "react";
import { Typography, IconButton, Grid } from "@mui/material";
import { HighlightOff } from "@mui/icons-material";

const Label = ({ text, color, id, deleteLabel }) => {
  return (
    <Grid style={{ 
        backgroundColor: 
        color,borderRadius: "14px",
        padding: "6px 8px" 
        }} 
        container alignItems="center" justify="space-around">
      <Grid item xs={10}>
        <Typography style={{
            fontWeight: "500",
            fontSize: "0.725rem",
            lineHeight: "14px",
            letterSpacing: "-0.035em",
            paddingBottom: "4px",
            paddingTop: "4px",
            textAlign: "center",
            color: "white",
            overflow: "hidden",
            textOverflow: "ellipsis"
        }}>
            {text}</Typography>
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={() => deleteLabel(id)} style={{
            padding: "0px",
            marginLeft: "-8px",
            marginTop: "-8px"
        }}>
          <HighlightOff style={{fontSize: "1.25rem", color: "white"}} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Label;