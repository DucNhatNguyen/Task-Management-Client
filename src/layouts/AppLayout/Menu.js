import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "provider/UserProvider";
import { UserAvatar } from "components";
import {
    IconButton,
    Typography,
    ListItemIcon,
    ListItemText,
    Avatar,
    Divider,
    CircularProgress,
} from "@mui/material";
import {
    AccountCircle,
    ArrowDropDown,
    ArrowDropUp,
    ExitToApp,
    Assignment
} from "@mui/icons-material";
import { PopMenu, PopMenuItem } from "./styles";
import { Authentication } from "provider/AuthProvider";
import { FetchUserData } from "api/User";

const Menu = ({ navigate }) => {
    const { handleLogout } = useContext(Authentication);
    const { userData, setUserData } = useContext(UserContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    return (
        <div>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                style={{
                    color: "#333333",
                    borderRadius: "0px",
                    minWidth: "250px",
                    display: "flex",
                    justifyContent: "flex-end",
                    "&:hover": {
                        background: "#ffffff",
                    }
                }}>
                <UserAvatar user={userData} styles={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px"
                }} />
                <Typography variant="subtitle2" style={{
                    marginLeft: "12px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center"
                }}>
                    {userData !== undefined ? (
                        userData.name
                    ) : (
                        <CircularProgress
                            style={{ width: "30px", height: "30px" }}
                            color="primary"
                        />
                    )}
                </Typography>
                {open ? (
                    <ArrowDropUp style={{ marginLeft: "16px" }} />
                ) : (
                    <ArrowDropDown style={{ marginLeft: "16px" }} />
                )}
            </IconButton>
            <PopMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <PopMenuItem onClick={() => navigate("/")}>
                    <ListItemIcon>
                        <Assignment fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Boards" />
                </PopMenuItem>
                <Divider style={{
                    width: "85%",
                    margin: "auto"
                }}
                />
                <PopMenuItem onClick={() => navigate("/profile")}>
                    <ListItemIcon>
                        <AccountCircle fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="My Profile" />
                </PopMenuItem>
                <Divider style={{
                    width: "85%",
                    margin: "auto"
                }} />
                <PopMenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <ExitToApp style={{ color: "#EB5757" }} fontSize="small" />
                    </ListItemIcon>
                    <ListItemText style={{ color: "#EB5757" }} primary="Logout" />
                </PopMenuItem>
            </PopMenu>
        </div>
    );
};

export default Menu;
