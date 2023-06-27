import React, { useContext } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
//import { UIContext } from "provider/UIProvider";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: 1200 + 1,
        color: "#fff",
    },
}));

const Loading = () => {
    const classes = useStyles();
    const { openBackdrop } = false;//useContext(UIContext);
    return (
        <Backdrop className={classes.backdrop} open={openBackdrop}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default Loading;
