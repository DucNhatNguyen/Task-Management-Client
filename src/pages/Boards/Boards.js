import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Container, Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { AppLayout } from "layouts";
// import { Board, AddBoardModal } from "components";
//import { UserContext } from "provider/UserProvider";
import { boardsStyles, useContainerStyles, useBoxStyles, useBoardsContainer } from "./styles";
import { AddBoardModal, Board } from "components";

const boardData = [
    {
        "admin": {
            "boards": {
                "-NYX6AimlUULSlFxgv6E": {
                    "boardId": "-NYX6AimlUULSlFxgv6E"
                }
            },
            "email": "ducnhat090199@gmail.com",
            "name": "N.T MAX",
            "picture": "https://lh3.googleusercontent.com/a/AAcHTtcmuVue47yEfADs1fvleNkCkS2XyQywMpft_yuO=s96-c",
            "uid": "JekzTyjSkDg4DyoRvFJcdbr1u9n1"
        },
        "coverPhoto": "https://images.unsplash.com/photo-1615058712849-d33b9e7824c5?ixid=MnwyMDY2MzR8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MTY1MDcwODQ&ixlib=rb-1.2.1",
        "date": "June 22, 2023",
        "id": "-NYYV0DUybOzG5C_grEt",
        "title": "dasasdas",
        "users": [
            {
                "uid": "JekzTyjSkDg4DyoRvFJcdbr1u9n1"
            }
        ],
        "visibility": "Private",
        "userData": [
            {
                "boards": {
                    "-NYX6AimlUULSlFxgv6E": {
                        "boardId": "-NYX6AimlUULSlFxgv6E"
                    },
                    "-NYYV0DUybOzG5C_grEt": {
                        "boardId": "-NYYV0DUybOzG5C_grEt"
                    }
                },
                "email": "ducnhat090199@gmail.com",
                "name": "N.T MAX",
                "picture": "https://lh3.googleusercontent.com/a/AAcHTtcmuVue47yEfADs1fvleNkCkS2XyQywMpft_yuO=s96-c",
                "uid": "JekzTyjSkDg4DyoRvFJcdbr1u9n1"
            }
        ]
    },
    {
        "admin": {
            "email": "ducnhat090199@gmail.com",
            "name": "N.T MAX",
            "picture": "https://lh3.googleusercontent.com/a/AAcHTtcmuVue47yEfADs1fvleNkCkS2XyQywMpft_yuO=s96-c",
            "uid": "JekzTyjSkDg4DyoRvFJcdbr1u9n1"
        },
        "coverPhoto": "https://images.unsplash.com/photo-1614620027698-6293a0a1eb0b?ixid=MnwyMDY2MzR8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MTY1MDcwODQ&ixlib=rb-1.2.1",
        "date": "June 22, 2023",
        "id": "-NYX6AimlUULSlFxgv6E",
        "listOrder": [
            "OF0U92xWp",
            "IXzTHC1sv"
        ],
        "lists": {
            "IXzTHC1sv": {
                "id": "IXzTHC1sv",
                "title": "dfgdfg"
            },
            "OF0U92xWp": {
                "id": "OF0U92xWp",
                "taskIds": [
                    "task-2",
                    "task-1"
                ],
                "title": "nhat"
            }
        },
        "tasks": {
            "task-1": {
                "id": "task-1",
                "title": "gdgfdg"
            },
            "task-2": {
                "assigments": [
                    "JekzTyjSkDg4DyoRvFJcdbr1u9n1"
                ],
                "comments": [
                    {
                        "id": "-NYXJDBdYL1bMUuxsAJC",
                        "name": "N.T MAX",
                        "picture": "https://lh3.googleusercontent.com/a/AAcHTtcmuVue47yEfADs1fvleNkCkS2XyQywMpft_yuO=s96-c",
                        "text": "đas",
                        "time": "22 June at 15:55",
                        "uid": "JekzTyjSkDg4DyoRvFJcdbr1u9n1"
                    },
                    {
                        "id": "-NYXJHrVL3jMwhNcoxdT",
                        "name": "N.T MAX",
                        "picture": "https://lh3.googleusercontent.com/a/AAcHTtcmuVue47yEfADs1fvleNkCkS2XyQywMpft_yuO=s96-c",
                        "text": " ádaddsadasdsadsad",
                        "time": "22 June at 15:55",
                        "uid": "JekzTyjSkDg4DyoRvFJcdbr1u9n1"
                    },
                    {
                        "id": "-NYXT44FXH7g9dbcPevO",
                        "name": "N.T MAX",
                        "picture": "https://lh3.googleusercontent.com/a/AAcHTtcmuVue47yEfADs1fvleNkCkS2XyQywMpft_yuO=s96-c",
                        "text": "ccascasc",
                        "time": "22 June at 16:38",
                        "uid": "JekzTyjSkDg4DyoRvFJcdbr1u9n1"
                    }
                ],
                "coverImage": "https://images.unsplash.com/photo-1615212466058-8d85dd9c7cd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDY2MzR8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MTY1MDcwODQ&ixlib=rb-1.2.1&q=80&w=1080",
                "description": " fsfsdf",
                "id": "task-2",
                "title": "dfgfgdfgfdcscscscsc"
            }
        },
        "title": "fgdfgdfgdfgdfg",
        "users": [
            {
                "uid": "JekzTyjSkDg4DyoRvFJcdbr1u9n1"
            }
        ],
        "visibility": "Private",
        "userData": [
            {
                "boards": {
                    "-NYX6AimlUULSlFxgv6E": {
                        "boardId": "-NYX6AimlUULSlFxgv6E"
                    },
                    "-NYYV0DUybOzG5C_grEt": {
                        "boardId": "-NYYV0DUybOzG5C_grEt"
                    }
                },
                "email": "ducnhat090199@gmail.com",
                "name": "N.T MAX",
                "picture": "https://lh3.googleusercontent.com/a/AAcHTtcmuVue47yEfADs1fvleNkCkS2XyQywMpft_yuO=s96-c",
                "uid": "JekzTyjSkDg4DyoRvFJcdbr1u9n1"
            }
        ]
    }
]

const Boards = () => {
    const { styledContainer: StyledContainer } = useContainerStyles();
    const { styledBox: StyledBox } = useBoxStyles();
    const { styledBoardsContainer: StyledBoardsContainer } = useBoardsContainer();
    let navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    //const { boards } = useContext(UserContext);
    const boards = boardData;
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
                                                image={value.coverPhoto}
                                                title={value.title}
                                                users={value.userData}
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
