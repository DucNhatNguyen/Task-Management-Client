import React from "react";
import { Typography, Grid, Menu, MenuItem } from "@mui/material";
import { Public, Lock } from "@mui/icons-material";
import { PopMenu, PopMenuItem } from "./styles";

const VisibilityMenu = ({
    open,
    anchorEl,
    handleClose,
    setBoardVisibility,
    boardVisibility,
}) => {
    return (
        <Menu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{ top: 140 }}
        >
            <Grid style={{
                paddingLeft: "12px",
                paddingRight: "12px",
                paddingTop: "14.4px",
                outlineWidth: "0"
            }} container>
                <Grid item xs={12}>
                    <Typography style={{
                        color: "black",
                        fontWeight: "600",
                        fontSize: "1rem"
                    }} component="p">
                        Visibility
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography style={{
                        marginTop: "4px",
                        color: "#828282",
                        fontSize: "0.875rem"
                    }} component="p">
                        Choose who can see this board
                    </Typography>
                </Grid>
            </Grid>
            <MenuItem
                style={{ backgroundColor: boardVisibility === "Public" && "#e2f7df" }}
                onClick={() => setBoardVisibility("Public")}
            >
                <Grid container>
                    <Grid style={{
                        marginBottom: "8px"
                    }} item xs={12} container>
                        <Grid
                            style={{ display: "flex", alignItems: "center" }}
                            item
                            xs={1}
                        >
                            <Public
                                style={{
                                    color: "#61BD4F",
                                    fontSize: "1rem",
                                    //color: "#828282"
                                }}
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <Typography style={{
                                fontSize: "0.875rem",
                                color: "black",
                                paddingLeft: "8px"
                            }} component="p">
                                Public
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{
                            fontSize: "0.75rem",
                            color: "#828282"
                        }} component="p">
                            Anyone can see this board. Only board members can edit.
                        </Typography>
                    </Grid>
                </Grid>
            </MenuItem>
            <MenuItem
                style={{
                    backgroundColor: boardVisibility === "Private" && "#ffe2de",
                }}
                onClick={() => setBoardVisibility("Private")}
            >
                <Grid container>
                    <Grid style={{
                        marginBottom: "8px"
                    }} item xs={12} container>
                        <Grid
                            style={{ display: "flex", alignItems: "center" }}
                            item
                            xs={1}
                        >
                            <Lock
                                style={{
                                    color: "#EB5A46",
                                    fontSize: "1rem",
                                    //color: "#828282"
                                }}
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <Typography style={{
                                fontSize: "0.875rem",
                                color: "black",
                                paddingLeft: "8px"
                            }} component="p">
                                Private
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{
                            fontSize: "0.75rem",
                            color: "#828282"
                        }} component="p">
                            Only board members can see and edit this board.
                        </Typography>
                    </Grid>
                </Grid>
            </MenuItem>
        </Menu>
    );
};

export default VisibilityMenu;
