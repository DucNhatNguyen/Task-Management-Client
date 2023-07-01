import React from "react";
import { Grid } from "@mui/material";
import { DndCanvas } from "components";
import { styled } from '@mui/material/styles';

const ListArea = ({ board }) => {
    const GridContainer = styled(Grid)(({ theme }) => ({
        overflow: "auto",
        width: "100%",
        height: "80vh",
        marginTop: theme.spacing(3),
        backgroundSize: "cover",
        backgroundPositionY: "center",
        borderRadius: "8px",
        "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
        },
        "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
        },
        "&::-webkit-scrollbar-thumb": {
            background: "#888",
        },
        "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
        },
    }));

    return (
        <div>
            <GridContainer
                style={{
                    backgroundImage:
                        board !== undefined && `url(${board.coverphoto}&w=1920)`,
                    backgroundColor: board === undefined && "#F8F9FD",
                }}
                container
            >
                <DndCanvas board={board} />
            </GridContainer>
        </div>
    );
};

export default ListArea;
