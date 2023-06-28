import React from "react";
import { Typography, IconButton } from "@mui/material";
import { People, Label, Image } from "@mui/icons-material";

const GrayButton = ({ icon, text, handleClick }) => {
  return (
    <IconButton
      onClick={handleClick}
      style={{
        backgroundColor: "#F2F2F2",
        borderRadius: "8px",
        color: "#828282",
        height: "44px",
        width: "90%",
        justifyContent: "start",
        paddingLeft: "24px",
      }}
      sx={{
        "&:hover": {
            backgroundColor: "#e6e5e5",
        },
      }}
      aria-label="edit"
    >
      {icon &&
        (icon === "people" ? (
          <People style={{fontSize: "1rem"}} />
        ) : icon === "label" ? (
          <Label style={{fontSize: "1rem"}} />
        ) : (
          <Image style={{fontSize: "1rem"}} />
        ))}
      <Typography
        style={{ marginLeft: icon ? "12px" : "0px",
                fontSize: "0.875rem",
                fontWeight: "500",
                lineHeight: "18px" }}
      >
        {text}
      </Typography>
    </IconButton>
  );
};

export default GrayButton;