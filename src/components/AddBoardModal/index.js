import React, { useContext, useState } from "react";
import {
    Grid,
    Typography,
    Button,
    Modal,
    IconButton,
    CircularProgress,
} from "@mui/material";
import { Clear, Image, Lock, Add, Public } from "@mui/icons-material";
import { UserContext } from "provider/UserProvider";
import { CreateNewBoard } from "api/Board";
import { BoardHelpers } from "helpers/";
import { VisibilityMenu, CoverMenu } from "components";
import { green } from "@mui/material/colors";
import { VisibilityEnum } from "helpers/Enum";


const placeholder =
    "https://images.unsplash.com/photo-1613085628218-d08b3a264f86?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80";

const AddBoardModal = ({ open, setOpen }) => {
    const { userData, setUserData, setBoards, setOpenBackdrop } = useContext(
        UserContext
    );

    const [visibilityAnchorEl, setVisibilityAnchorEl] = useState(null);
    const [openVisibility, setOpenVisibilty] = useState(false);

    const [coverAnchorEl, setCoverAnchorEl] = useState(null);

    const [boardTitle, setBoardTitle] = useState("");
    const [boardVisibility, setBoardVisibility] = useState(VisibilityEnum.Private);

    const [coverImageRegular, setCoverImageRegular] = useState();
    const [coverImageRaw, setCoverImageRaw] = useState();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleCreate = () => {
        if (coverImageRaw === undefined) {
            setError("Select a cover image!");
        } else if (boardTitle.trim().length <= 0) {
            setError("Title field cannot be empty!");
        } else {
            setLoading(true);
            setError("");

            const boardData = {
                title: boardTitle,
                coverPhoto: coverImageRaw,
                visibility: boardVisibility,
                userid: userData.id,
            };

            CreateNewBoard(boardData).then((response) => {
                if (response.responseCode === 200) {
                    BoardHelpers.HandleBoardCreation(
                        response.responseData,
                        userData,
                        setUserData,
                        setBoards,
                        setOpenBackdrop
                    )
                    .then(() => {
                        setSuccess(true);
                        setLoading(false);
                        handleClose();
                        setError("");
                    })
                    .catch((err) => {
                        setLoading(false);
                        setError(err);
                        console.log(err);
                    });
                } 
            }).catch((err) => {
                setLoading(false);
                setError(err);
                console.log(err);
            });
        }
    };

    const handleClose = () => {
        setOpen(false);
        setError("");
        setCoverImageRaw();
        setCoverImageRegular();
        setBoardTitle("");
        setBoardVisibility(VisibilityEnum.Private)
    };

    const handleVisibilityClick = (event) => {
        setVisibilityAnchorEl(event.currentTarget);
        setOpenVisibilty(true);
    };

    const handleVisibilityClose = () => {
        setVisibilityAnchorEl(null);
        setOpenVisibilty(false);
    };

    const handleCoverClick = (event) => {
        setCoverAnchorEl(event.currentTarget);
    };

    const handleCoverClose = () => {
        setCoverAnchorEl(null);
    };

    const handleImageClick = (regular, raw) => {
        setCoverImageRegular(regular);
        setCoverImageRaw(raw);
    };

    return (
        <Modal
            style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                paddingTop: "64px"
            }}
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={{
                backgroundColor: "white",
                width: "500px",
                minHeight: "350px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
                borderRadius: "8px",
                outlineColor: "white",
                outlineWidth: "0px"
            }}>
                <Grid style={{
                    padding: "16px"
                }} container direction="column">
                    <Grid
                        style={{
                            marginBottom: "32px"
                        }}
                        item
                        container
                        justifyContent="end"
                        xs={12}
                    >
                        <IconButton
                            onClick={handleClose}
                            style={{
                                backgroundColor: "#2F80ED",
                                color: "white",
                                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                                borderRadius: "8px",
                                width: "2rem",
                                height: "2rem",
                                padding: "18px",
                                zIndex: "100",
                                position: "absolute",
                                marginTop: "-8px",
                                marginRight: "-8px",
                                "&:hover": {
                                    backgroundColor: "rgb(32, 89, 165)",
                                },
                            }}
                            aria-label="delete"
                        >
                            <Clear />
                        </IconButton>
                        <img
                            style={{
                                width: "100%",
                                height: "136px",
                                borderRadius: "8px",
                                objectFit: "cover"
                            }}
                            src={
                                coverImageRegular !== undefined
                                    ? coverImageRegular
                                    : placeholder
                            }
                            alt=""
                        />
                    </Grid>
                    <Grid
                        style={{
                            marginBottom: "32px"
                        }}
                        container
                        justify="center"
                        item
                        xs={12}
                    >
                        <input
                            value={boardTitle}
                            onChange={(e) => setBoardTitle(e.target.value)}
                            placeholder="Add board title"
                            type="text"
                            style={{
                                width: "100%",
                                borderRadius: "8px",
                                border: "2px solid #E0E0E0",
                                paddingLeft: "16px",
                                paddingTop: "8px",
                                paddingBottom: "8px",
                                outlineWidth: "0",
                                color: "#757575",
                                letterSpacing: "-0.035em",
                                fontWeight: "500",
                                fontFamily: "Poppins",
                                fontSize: "0.875rem"
                            }}
                        />
                    </Grid>
                    <Grid
                        style={{
                            marginBottom: "32px"
                        }}
                        item
                        container
                        xs={12}
                        justify="space-between"
                    >
                        <Grid item xs={6}>
                            <IconButton
                                onClick={handleCoverClick}
                                style={{
                                    width: "90%",
                                    backgroundColor: "#F2F2F2",
                                    borderRadius: "8px",
                                    color: "#828282",
                                    height: "44px",
                                    "&:hover": {
                                        backgroundColor: "#e6e5e5",
                                    },
                                }}
                                aria-label="cover"
                            >
                                <Image style={{
                                    width: "1rem",
                                    height: "1rem",
                                    marginRight: "8px",
                                    marginLeft: "-16px"
                                }} />
                                <Typography style={{
                                    fontSize: "0.875rem",
                                    fontWeight: "500",
                                    lineHeight: "18px",
                                    fontFamily: "Poppins"
                                }}>Cover</Typography>
                            </IconButton>
                            <CoverMenu
                                handleImageClick={handleImageClick}
                                open={openVisibility}
                                anchorEl={coverAnchorEl}
                                handleClose={handleCoverClose}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <IconButton
                                style={{
                                    float: "right",
                                    backgroundColor:
                                        boardVisibility === VisibilityEnum.Private ? "#ffe2de" : "#e2f7df",
                                    width: "90%",
                                    //backgroundColor: "#F2F2F2",
                                    borderRadius: "8px",
                                    color: "#828282",
                                    height: "44px",
                                    "&:hover": {
                                        backgroundColor: "#e6e5e5",
                                    },
                                }}
                                onClick={handleVisibilityClick}
                                aria-label="cover"
                            >
                                {boardVisibility === VisibilityEnum.Private ? (
                                    <Lock style={{
                                        width: "1rem",
                                        height: "1rem",
                                        marginRight: "8px",
                                        marginLeft: "-16px"
                                    }} />
                                ) : (
                                    <Public style={{
                                        width: "1rem",
                                        height: "1rem",
                                        marginRight: "8px",
                                        marginLeft: "-16px"
                                    }} />
                                )}
                                <Typography style={{
                                    fontSize: "0.875rem",
                                    fontWeight: "500",
                                    lineHeight: "18px",
                                    fontFamily: "Poppins"
                                }} component="p">
                                    {boardVisibility}
                                </Typography>
                            </IconButton>
                            <VisibilityMenu
                                open={openVisibility}
                                anchorEl={visibilityAnchorEl}
                                handleClose={handleVisibilityClose}
                                setBoardVisibility={setBoardVisibility}
                                boardVisibility={boardVisibility}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={12}
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                        justifyContent="end"
                    >
                        {error && (
                            <Grid item xs={12}>
                                <Typography style={{
                                    fontSize: "0.825rem",
                                    color: "#f44336",
                                    marginTop: "12px",
                                    marginBottom: "24px",
                                    textAlign: "center"
                                }}>{error}</Typography>
                            </Grid>
                        )}
                        <Grid item xs={3}>
                            <Button onClick={handleClose}
                                onMouseOver={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.04)'}
                                onMouseLeave={(e) => e.target.style.background = "none"}
                                style={{
                                    backgroundColor: "white",
                                    borderRadius: "8px",
                                    color: "#828282",
                                    paddingLeft: "16px",
                                    paddingRight: "16px"
                                }}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                onClick={handleCreate}
                                variant="contained"
                                color="primary"
                                style={
                                    success ? {
                                        backgroundColor: green[500],
                                        "&:hover": {
                                            backgroundColor: green[700],
                                        },
                                    } : {
                                        borderRadius: "8px",
                                    }
                                }
                                startIcon={<Add />}
                                disabled={loading}
                            >
                                {loading && (
                                    <CircularProgress
                                        size={24}
                                        style={{
                                            color: green[500],
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            marginTop: -12,
                                            marginLeft: -12
                                        }}
                                    />
                                )}
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Modal>
    );
};

export default AddBoardModal;
