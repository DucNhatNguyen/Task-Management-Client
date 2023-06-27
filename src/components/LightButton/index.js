import React from "react";
import { Typography, IconButton } from "@mui/material";
import { Edit, Add } from "@mui/icons-material";

const LightButton = ({ icon, text, handleClick }) => {
    return (
        <IconButton onClick={handleClick} style={{
            border: "1px solid #BDBDBD",
            borderRadius: "8px",
            height: "24px"
        }} aria-label="edit">
            {icon && (
                icon === "edit" ? (
                    <Edit style={{
                        fontSize: "1rem",
                    }} />
                ) : (
                    <Add style={{
                        fontSize: "1rem",
                    }} />
                )
            )}
            <Typography style={{
                marginLeft: icon ? "8px" : "0px", lineHeight: "15px",
                letterSpacing: "-0.035em",
                fontSize: "0.725rem",
                fontWeight: "600"
            }}>{text}</Typography>
        </IconButton>
    );
};

export default LightButton;
