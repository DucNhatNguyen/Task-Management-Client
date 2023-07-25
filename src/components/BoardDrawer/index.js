import React, { useState, useContext, useEffect } from "react";
import { UIContext } from "provider/UIProvider";
import { UserContext } from "provider/UserProvider";
import { BoardHelpers } from "helpers";
import {
    Drawer,
    Grid,
    Typography,
    Button,
    IconButton,
    Avatar,
    Dialog,
    DialogTitle,
    DialogActions,
} from "@mui/material";
import { SectionTitle, EditInput, LightButton, UserAvatar } from "components";
import { Close } from "@mui/icons-material";
import { drawerStyles } from "./styles";
import slugify from "slugify";

const BoardDrawer = ({ board, admin }) => {
    const classes = drawerStyles();
    const { drawerOpen, changeDrawerVisibility, setRenderedBoard, renderedBoard } = useContext(
        UIContext
    );
    const { boards, setBoards } = useContext(UserContext);

    const [displayDescriptionEditArea, setDisplayDescriptionEditArea] = useState(
        false
    );
    const [displayTitleEditArea, setDisplayTitleEditArea] = useState(false);
    const [displayRemoveDialog, setDisplayRemoveDialog] = useState(false);

    const [madeBy, setMadeBy] = useState()

    useEffect(() => {
        setMadeBy(board?.members.find(i => i.id === board.createdby))
        // console.log("drawerrr", board?.members.find(i => i.id === board.createdby))
    }, [board])

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        changeDrawerVisibility("set", false);
    };
    const closeDescriptionEditArea = () => {
        setDisplayDescriptionEditArea(false);
    };
    const closeTitleEditArea = () => {
        setDisplayTitleEditArea(false);
    };
    const closeRemoveDialog = () => {
        setDisplayRemoveDialog(false);
    };
    const editDescription = (description) => {
        // setRenderedBoard({ ...board, description: description });
        // BoardHelpers.HandleBoardPropertyUpdate(
        //     board.id,
        //     "description",
        //     description
        // ).then(() => {
        //     for (let i = 0; i < boards.length; i++) {
        //         if (boards[i].id === board.id) {
        //             boards[i].description = description;
        //             setBoards(boards);
        //         }
        //     }
        // });
    };
    const editTitle = (title) => {
        let slug = slugify(title, {
                replacement: '-',
                remove: undefined,
                lower: true,     
                strict: false,
                locale: 'vi',
                trim: true
            })
        const newState = { ...board, title: title };
        setRenderedBoard(newState);
        BoardHelpers.HandleBoardPropertyUpdate(
            board.id, 
            "Title", 
            {
                title: title,
                slug: slug
        }).then(
            () => {
                for (let i = 0; i < boards.length; i++) {
                    if (boards[i].id === board.id) {
                        boards[i].title = title;
                        setBoards(boards);
                    }
                }
            }
        );
    };
    const removeUser = (user) => {
        console.log('remove memberrrr', renderedBoard);
        const id = user.id;
        const users = board.members.filter((user) => user.id !== id);
        // const userData = board.userData.filter((user) => user.uid !== uid);

        setRenderedBoard({
            ...board,
            members: users
        });
        BoardHelpers.HandleBoardPropertyUpdate(
                board.id, 
                "RemoveMember", 
                id
            )
            .then(
            () => {
                for (let i = 0; i < boards.length; i++) {
                    if (boards[i].id === board.id) {
                        boards[i].members = users;
                        setBoards(boards);
                    }
                }
            }
        );
        //BoardHelpers.HandleRemovingUser(board.id, uid);
    };

    return (
        <Drawer
            variant="persistent"
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            classes={{ paper: classes.drawer }}
            
            
        >
            {board && (
                <Grid container justify="center" style={{ marginLeft: "20px" }}>
                    {/* MENU - X BUTTON */}
                    <Grid
                        item
                        container
                        xs={11}
                        alignItems="center"
                        className={classes.gridItem}
                        style={{ borderBottom: "1px solid #E0E0E0", marginTop: "8px",marginBottom: "16px", }}
                    >
                        <Grid item xs>
                            <Typography
                                variant="subtitle1"
                                component="p"
                                className={classes.menuTitle}
                                style={{
                                    fontWeight: "600",
                                    lineHeight: "18px",
                                    letterSpacing: "-0.035em",
                                    color: "#333333",
                                }}
                            >
                                Menu
                            </Typography>
                        </Grid>
                        <Grid item xs={2} container justifyContent="end">
                            <IconButton
                                className={classes.closeButton}
                                style={{
                                    padding: "8px",
                                }}
                                onClick={() => changeDrawerVisibility("set", false)}
                            >
                                <Close />
                            </IconButton>
                        </Grid>
                    </Grid>
                    {/* MADE BY - AVATAR */}
                    <Grid item container xs={11} className={classes.gridItem} 
                        style={{
                            marginBottom: "16px",
                        }}>
                        <Grid item xs>
                            <SectionTitle
                                title="Made by"
                                icon="account"
                                alignItems="center"
                            />
                        </Grid>
                        {madeBy && (
                            <Grid item container xs={12} style={{ marginTop: "14px" }}>
                                <Grid item style={{ width: "45px" }}>
                                    <UserAvatar 
                                    user={madeBy} 
                                    styles={{
                                        borderRadius: "8px",
                                        width: "35px",
                                        height: "35px",
                                    }} />
                                </Grid>
                                <Grid item container xs>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="subtitle1"
                                            component="p"
                                            style={{
                                                fontWeight: "600",
                                                fontSize: "0.825rem",
                                                lineHeight: "18px",
                                                letterSpacing: "-0.035em",
                                                color: "#333333",
                                                marginLeft: "10px"
                                            }}
                                        >
                                            {madeBy.fullname}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="body2"
                                            component="p"
                                            style={{
                                                fontWeight: "500",
                                                lineHeight: "14px",
                                                fontSize: "0.725rem",
                                                letterSpacing: "-0.035em",
                                                color: "#BDBDBD",
                                                marginLeft: "10px"
                                            }}
                                        >
                                            on  <strong>{new Date(board.createdtime).toLocaleDateString()}</strong>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                    {/* TITLE - EDIT BUTTON */}
                    <Grid
                        item
                        container
                        xs={11}
                        className={classes.gridItem}
                        alignItems="center"
                        style={{ marginTop: "8px", marginBottom: "16px" }}
                    >
                        <Grid item xs style={{ width: "120px", maxWidth: "120px" }}>
                            <Grid item xs style={{ width: "120px", maxWidth: "120px" }}>
                                <SectionTitle
                                    title="Title"
                                    icon="description"
                                    alignItems="center"
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs
                            container
                            justify="start"
                            style={{ display: admin ? "flex" : "none" }}
                        >
                            <LightButton
                                handleClick={() =>
                                    setDisplayTitleEditArea(!displayTitleEditArea)
                                }
                                icon="edit"
                                text="Edit"
                            />
                        </Grid>
                    </Grid>
                    {/* EDIT TITLE */}
                    <Grid
                        style={{
                            display: displayTitleEditArea ? "flex" : "none",
                            marginBottom: "24px",
                        }}
                        item
                        container
                        xs={11}
                    >
                        <EditInput
                            value={board.title || ""}
                            editInput={editTitle}
                            handleClose={closeTitleEditArea}
                            label="Title"
                        />
                    </Grid>
                    {/* TITLE ITSELF */}
                    <Grid
                        style={{
                            display: displayTitleEditArea ? "none" : "flex",
                            marginBottom: "12px",
                        }}
                        item
                        container
                        xs={11}
                    >
                        <Typography 
                        variant="body1" 
                        style={{
                            fontWeight: "600",
                            lineHeight: "18px",
                            letterSpacing: "-0.035em",
                            color: "#333333",
                        }}>
                            {board.title || ""}
                        </Typography>
                    </Grid>
                    {/* DESCRIPTION - EDIT BUTTON */}
                    {/* <Grid
                        item
                        container
                        xs={11}
                        className={classes.gridItem}
                        alignItems="center"
                        style={{ marginTop: "8px", marginBottom: "16px" }}
                    >
                        <Grid item xs style={{ width: "120px", maxWidth: "120px" }}>
                            <SectionTitle
                                title="Description"
                                icon="description"
                                alignItems="end"
                            />
                        </Grid>
                        <Grid item xs={2} style={{ display: admin ? "block" : "none" }}>
                            <LightButton
                                handleClick={() =>
                                    setDisplayDescriptionEditArea(!displayDescriptionEditArea)
                                }
                                icon="edit"
                                text="Edit"
                            />
                        </Grid>
                    </Grid> */}
                    {/* EDIT DESCRIPTION */}
                    {/* <Grid
                        style={{
                            display: displayDescriptionEditArea ? "flex" : "none",
                            marginBottom: "24px",
                        }}
                        item
                        container
                        xs={11}
                    >
                        <EditInput
                            value={board.description || ""}
                            editInput={editDescription}
                            handleClose={closeDescriptionEditArea}
                            label="Description"
                        />
                    </Grid> */}
                    {/* DESCRIPTION ITSELF */}
                    {/* <Grid
                        style={{
                            display: displayDescriptionEditArea ? "none" : "flex",
                            marginBottom: "12px",
                        }}
                        item
                        container
                        xs={11}
                    >
                        <Typography 
                            variant="body1" 
                            className={classes.description}
                            style={{
                                fontSize: "0.925rem",
                                lineHeight: "21px",
                                letterSpacing: "-0.035em",
                                whiteSpace: "pre-line",
                            }}
                        >
                                {board.description || ""}
                        </Typography>
                    </Grid> */}
                    {/* TEAM */}
                    <Grid
                        item
                        container
                        xs={11}
                        style={{ marginBottom: "16px" }}
                        alignItems="center"
                    >
                        <Grid item xs>
                            <SectionTitle title="Team" icon="people" alignItems="center" />
                        </Grid>
                    </Grid>
                    {/* MAPPING TEAM MEMBERS */}
                    {//board.members &&
                        //board.users &&
                        board?.members.map((user, index) => {
                            if (board.createdby === user.id) {
                                return (
                                    <Grid
                                        item
                                        container
                                        xs={11}
                                        //className={classes.gridItem}
                                        style={{ marginBottom: "16px" }}
                                        alignItems="center"
                                        key={index}
                                    >
                                        <Grid item style={{ width: "50px" }}>
                                            <UserAvatar 
                                            user={user} 
                                            styles={{
                                                borderRadius: "8px",
                                                width: "35px",
                                                height: "35px",
                                            }} />
                                        </Grid>
                                        <Grid item container xs={7}>
                                            <Grid item xs={12}>
                                                <Typography
                                                    variant="subtitle1"
                                                    component="p"
                                                    className={classes.memberName}
                                                    style={{
                                                        fontWeight: "600",
                                                        fontSize: "0.825rem",
                                                        lineHeight: "18px",
                                                        letterSpacing: "-0.035em",
                                                        color: "#333333",
                                                    }}
                                                >
                                                    {user.fullname}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item container xs>
                                            <Grid item xs={12}>
                                                <Typography
                                                    variant="subtitle1"
                                                    component="p"
                                                    style={{
                                                        lineHeight: "15px",
                                                        letterSpacing: "-0.035em",
                                                        fontSize: "0.75rem",
                                                        fontWeight: "500",
                                                        color: "#828282",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    Admin
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                );
                            } else {
                                return (
                                    <Grid
                                        item
                                        container
                                        xs={11}
                                        className={classes.gridItem}
                                        style={{ marginBottom: "16px" }}
                                        alignItems="center"
                                        key={index}
                                    >
                                        <Grid item style={{ width: "50px" }}>
                                            <UserAvatar 
                                            user={user} 
                                            styles={{
                                                borderRadius: "8px",
                                                width: "35px",
                                                height: "35px",
                                            }} />
                                        </Grid>
                                        <Grid item container xs={7}>
                                            <Grid item xs={12}>
                                                <Typography
                                                    variant="subtitle1"
                                                    component="p"
                                                    style={{
                                                        fontWeight: "600",
                                                        fontSize: "0.825rem",
                                                        lineHeight: "18px",
                                                        letterSpacing: "-0.035em",
                                                        color: "#333333",
                                                    }}
                                                >
                                                    {user.fullname}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item container xs justify="center">
                                            <Grid item contaşner xs={9}>
                                                <div
                                                    onClick={() => {
                                                        //setDisplayRemoveDialog(true)
                                                        removeUser(user)
                                                    }}
                                                    className={classes.redButton}
                                                    style={{ 
                                                        display: admin ? "flex" : "none", 
                                                        border: "1px solid #EB5757",
                                                        borderRadius: "8px",
                                                        height: "28px",
                                                        //display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                                                        "&:hover": {
                                                            cursor: "pointer",
                                                            backgroundColor: "#eb57570d",
                                                        }, }}
                                                >
                                                    <Typography
                                                        variant="subtitle1"
                                                        component="p"
                                                        className={classes.redButtonText}
                                                        style={{ 
                                                            textAlign: "center",
                                                            lineHeight: "15px",
                                                            letterSpacing: "-0.035em",
                                                            fontSize: "0.725rem",
                                                            fontWeight: "600",
                                                            color: "#EB5757",
                                                        }}
                                                    >
                                                        Remove
                                                    </Typography>
                                                </div>
                                            </Grid>
                                            <Dialog
                                                open={displayRemoveDialog}
                                                onClose={closeRemoveDialog}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle>{"Remove this user?"}</DialogTitle>
                                                <DialogActions>
                                                    <Button onClick={closeRemoveDialog} color="primary">
                                                        Go Back
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            removeUser(user);
                                                            closeRemoveDialog();
                                                        }}
                                                        style={{ color: "#f44336" }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </Grid>
                                    </Grid>
                                );
                            }
                        })}
                </Grid>
            )}
        </Drawer>
    );
};

export default BoardDrawer;
