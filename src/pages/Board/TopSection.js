import React, { useContext, useState } from "react";
//import { UIContext } from "provider/UIProvider";
import { Grid, Typography, IconButton, Button } from "@mui/material";
import { Public, Lock, MoreHoriz, Add } from "@mui/icons-material";
import { VisibilityMenu, UserAvatar, InviteUserMenu } from "components";
import { styled } from '@mui/material/styles';

const TopSection = ({ board, admin }) => {
    //const { changeDrawerVisibility } = useContext(UIContext);

    const [visibilityAnchorEl, setVisibilityAnchorEl] = useState(null);
    const [openVisibility, setOpenVisibilty] = useState(false);
    const [boardVisibility, setBoardVisibility] = useState("Private");
    const [inviteAnchorEl, setInviteAnchorEl] = useState(null);

    const handleVisibilityClick = (event) => {
        setVisibilityAnchorEl(event.currentTarget);
        setOpenVisibilty(true);
    };
    const handleVisibilityClose = () => {
        setVisibilityAnchorEl(null);
        setOpenVisibilty(false);
    };
    const handleInviteButtonClick = (event) => {
        setInviteAnchorEl(event.currentTarget);
    };
    const handleInviteMenuClose = () => {
        setInviteAnchorEl(null);
    };
    const Root = styled('div')(({ theme }) => ({
        marginTop: "40px",
        [theme.breakpoints.down("xs")]: {
            marginTop: "25px",
        },
    }));
    const GridContainer = styled(Grid)(({ theme }) => ({
        [theme.breakpoints.down("xs")]: {
            flexDirection: "column-reverse",
        },
    }));
    const GridVisibilityMenuContainer = styled(Grid)(({ theme }) => ({
        [theme.breakpoints.down("xs")]: {
            display: "none",
        },
    }));
    const GridIconGrid = styled(Grid)(({ theme }) => ({
        marginLeft: theme.spacing(2),
        [theme.breakpoints.down("xs")]: {
            marginRight: theme.spacing(2),
            marginLeft: "0px",
            marginBottom: theme.spacing(0.5),
        },
    }));
    const MenuButton = styled(IconButton)(({ theme }) => ({
        width: "100%",
        maxWidth: "150px",
        backgroundColor: "#F2F2F2",
        borderRadius: "8px",
        color: "#828282",
        height: "44px",
        [theme.breakpoints.down("xs")]: {
            marginBottom: theme.spacing(2),
        },
    }));
    const VisibilityText = (value) => {
        var text = "";
        switch (value) {
            case 1:
                text = "Private";
                break;
            case 2:
                text = "Public";
                break;
            case 3:
                text = "Cancel";
                break;
            default:
        }
        return text;
    }
    return (
        <Root>
            <GridContainer container>
                <Grid item container xs>
                    <GridVisibilityMenuContainer
                        item
                        style={{ minWidth: "120px" }}
                    >
                        <IconButton
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleVisibilityClick}
                            style={{
                                width: "100%",
                                maxWidth: "120px",
                                backgroundColor: "#F2F2F2",
                                borderRadius: "8px",
                                color: "#828282",
                                height: "44px",
                            }}
                            sx={{ "&:hover": { backgroundColor: "#e6e5e5" } }}
                            disabled={!admin}
                        >
                            {board && board.visibility === 1 ? (
                                <Lock style={{
                                    width: "1rem",
                                    height: "1rem",
                                    marginRight: "8px",
                                    marginLeft: "-8px"
                                }} />
                            ) : (
                                <Public style={{
                                    width: "1rem",
                                    height: "1rem",
                                    marginRight: "8px",
                                    marginLeft: "-8px"
                                }} />
                            )}
                            <Typography style={{
                                fontSize: "0.875rem",
                                fontWeight: "500",
                                lineHeight: "18px",
                                fontFamily: "Poppins"
                            }} component="p">
                                {board && VisibilityText(board.visibility)}
                            </Typography>
                        </IconButton>
                        <VisibilityMenu
                            open={openVisibility}
                            anchorEl={visibilityAnchorEl}
                            handleClose={handleVisibilityClose}
                            setBoardVisibility={setBoardVisibility}
                            boardVisibility={boardVisibility}
                        />
                    </GridVisibilityMenuContainer>
                    <Grid item container xs>
                        {board !== undefined &&
                            board.members.map((user, key) => {
                                return (
                                    <GridIconGrid item key={key}>
                                        <UserAvatar user={user} styles={{ borderRadius: "8px" }} />
                                    </GridIconGrid>
                                );
                            })}
                        <GridIconGrid
                            item
                            style={{ display: admin ? "block" : "none" }}
                        >
                            <IconButton
                                onClick={handleInviteButtonClick}
                                style={{
                                    backgroundColor: "#1976d2",
                                    borderRadius: "8px",
                                    width: "40px",
                                    height: "40px",
                                    color: "white",
                                }}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: "#1565c0"
                                    },
                                }}
                                aria-label="add-member"
                            >
                                <Add />
                            </IconButton>
                            <InviteUserMenu
                                boardId={board && board.id}
                                anchorEl={inviteAnchorEl}
                                handleClose={handleInviteMenuClose}
                            />
                        </GridIconGrid>
                    </Grid>
                </Grid>
                <Grid item container sm={3} xs={12}>
                    <Grid
                        justifyContent="flex-end"
                        container
                        item
                        xs={12}
                    //className={classes.showMenuContainer}
                    >
                        <MenuButton
                            sx={{ "&:hover": { backgroundColor: "#e6e5e5" } }}
                            aria-label="cover"
                        //onClick={changeDrawerVisibility}
                        >
                            <MoreHoriz style={{
                                marginRight: "8px",
                                marginLeft: "-8px"
                            }} />
                            <Typography style={{
                                fontSize: "0.875rem",
                                fontWeight: "500",
                                lineHeight: "18px",
                                fontFamily: "Poppins"
                            }}
                                component="p">
                                Show Menu
                            </Typography>
                        </MenuButton>
                    </Grid>
                </Grid>
            </GridContainer>
        </Root>
    );
};

export default TopSection;
