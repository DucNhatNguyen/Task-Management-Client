import React, { useEffect, useState, useContext } from "react";
import { Typography, Grid, Button } from "@mui/material";
//import { UserContext } from "provider/UserProvider";
import { BoardHelpers } from "helpers";
import { PopMenu } from "./styles";

const renderedBoard = {
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
}

const InviteUserMenu = ({ boardId, anchorEl, handleClose }) => {
    //const { renderedBoard, setRenderedBoard } = useContext(UserContext);

    const [input, setInput] = useState("");
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setError("");
    }, [input]);

    const handleInviteButtonClick = () => {
        if (!input.trim().length > 0) {
            setError("Input cannot be empty!");
        } else {
            setLoading(true);
            BoardHelpers.HandleInvitingUser(boardId, input)
                .then((response) => {
                    setLoading(false);
                    if (response.statusCode === 500) {
                        setError(response.error);
                    } else if (response.statusCode === 200) {
                        let board = { ...renderedBoard };
                        board.userData.push(response.data);
                        board.users.push({ uid: response.data.uid });
                        //setRenderedBoard(board);
                        handleClose();
                        setError("");
                        setInput("");
                    } else {
                        handleClose();
                        setError("");
                        setInput("");
                    }
                })
                .catch((err) => {
                    setError(err);
                    setLoading(false);
                    console.log(err);
                });
        }
    };

    return (
        <div>
            <PopMenu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => {
                    handleClose();
                    setError("");
                    setInput("");
                }}
                sx={{
                    top: 144,
                    left: 86,
                    borderRadius: 1
                }}
            >
                <Grid style={{
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    paddingTop: "14.4px",
                    outlineWidth: "0"
                }} container
                    justifyContent="center"
                >
                    <Grid item xs={12}>
                        <Typography style={{
                            color: "black",
                            fontWeight: "600",
                            fontSize: "1rem"
                        }} component="p">
                            Invite User
                        </Typography>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <Typography className={classes.headerDescription} component="p">
                        Enter email address
                        </Typography>
                        </Grid> */}
                </Grid>
                <Grid style={{
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    paddingTop: "14.4px",
                    paddingBottom: "14.4px"
                }} item container
                    justifyContent="center">
                    <Grid item container xs={12} style={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 12px rgb(0 0 0 / 15%)"
                    }}>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="User address"
                            type="text"
                            style={{
                                width: "100%",
                                height: "100%",
                                paddingLeft: "16px",
                                paddingTop: "8px",
                                paddingBottom: "8px",
                                outlineWidth: "0",
                                color: "#757575",
                                letterSpacing: "-0.035em",
                                fontWeight: "500",
                                fontFamily: "Poppins",
                                fontSize: "0.875rem",
                                border: "none",
                                borderRadius: "8px"
                            }}
                            onKeyDown={(e) => e.stopPropagation()}
                        />
                    </Grid>
                </Grid>
                <Grid item container>
                    {error && (
                        <Grid item container xs={12} justify="center">
                            <Typography style={{
                                color: "#EB5757",
                                marginBottom: "8px",
                                fontWeight: "600",
                                fontSize: "0.825rem",
                                paddingLeft: "24px",
                                paddingRight: "24px"
                            }}>
                                Not a valid user address!
                            </Typography>
                        </Grid>
                    )}
                    <Grid
                        item
                        container
                        justifyContent="center"
                        xs={12}>
                        <Button
                            onClick={handleInviteButtonClick}
                            style={{
                                width: "30%",
                                marginRight: "10px",
                                marginTop: "5px",
                                borderRadius: "8px",
                                fontWeight: 500,
                                fontSize: "0.775rem",
                                lineHeight: "14px",
                                letterSpacing: "-0.035em",
                                height: "32px",
                                marginBottom: "8px"
                            }}
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            Invite
                        </Button>
                    </Grid>
                </Grid>
            </PopMenu>
        </div>
    );
};

export default InviteUserMenu;
