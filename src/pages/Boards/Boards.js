import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { AppLayout } from "layouts";
import { UserContext } from "provider/UserProvider";
import { useContainerStyles, useBoxStyles, useBoardsContainer } from "./styles";
import { AddBoardModal, Board } from "components";

const Boards = () => {
    const { styledContainer: StyledContainer } = useContainerStyles();
    const { styledBox: StyledBox } = useBoxStyles();
    const { styledBoardsContainer: StyledBoardsContainer } = useBoardsContainer();
    let navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    const { boards } = useContext(UserContext);

    const handleBoardClick = (boardId) => {
        navigate("/board/" + boardId);
    };

    const handleCreateButton = () => {
        setModalOpen(true);
    };

    return (
        <AppLayout>
            <div style={{ flexGrow: 1 }}>
                <StyledContainer component="main" maxWidth="lg">
                    <StyledBox display="flex">
                        <Box p={1} flexGrow={1}>
                            <Typography style={{
                                letterSpacing: "-0.035em",
                                color: "#333333"
                            }}
                                variant="h6" gutterBottom>
                                All Boards
                            </Typography>
                        </Box>
                        <Box p={1}>
                            <Button
                                onClick={handleCreateButton}
                                variant="contained"
                                color="primary"
                                size="small"
                                style={{
                                    backgroundColor: "#2F80ED",
                                    borderRadius: "8px",
                                    padding: "6px 13px"
                                }}
                                startIcon={<Add />}
                            >
                                Add
                            </Button>
                        </Box>
                    </StyledBox>
                    <StyledBoardsContainer container spacing={3}>
                        {boards !== undefined &&
                            boards.length > 0 &&
                            boards.map((value, key) => {
                                return (
                                    <Grid container key={key} item lg={3} md={3} sm={4} xs={10}>
                                        <div onClick={() => handleBoardClick(value.id)}>
                                            <Board
                                                image={value.coverphoto}
                                                title={value.title}
                                                users={value.members}
                                                visibility={value.visibility}
                                            />
                                        </div>
                                    </Grid>
                                );
                            })}
                    </StyledBoardsContainer>
                    <AddBoardModal open={modalOpen} setOpen={setModalOpen} />
                </StyledContainer>
            </div>
        </AppLayout>
    );
};

export default Boards;
