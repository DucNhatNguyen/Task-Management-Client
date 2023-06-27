import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { UserAvatar } from "components";

const Boards = ({ image, title, users, visibility }) => {
    return (
        <div style={{
            flexGrow: 1,
            height: "100%"
        }}>
            <Paper
                sx={{
                    '&:hover': {
                        cursor: "pointer",
                        boxShadow: 7
                    },
                }}
                style={{
                    padding: "12px",
                    boxShadow: 4,
                    borderRadius: "12px",
                    transition: "all .2s ease-in-out",
                    height: "100%"
                }}
            >
                <img style={{
                    width: "100%",
                    borderRadius: "12px",
                    height: "170px",
                    objectFit: "cover"
                }} src={image + "&q=80&w=400"} alt="" />
                <Typography style={{
                    fontWeight: "500",
                    letterSpacing: "-0.035em",
                    marginTop: "12px",
                    marginBottom: "12px"
                }} variant="body1" gutterBottom>
                    {title}
                </Typography>
                <Box display="flex">
                    {users.map((user, key) => {
                        if (key < 3) {
                            return (
                                <Box key={key} alignSelf="center" style={{
                                    marginRight: "8px"
                                }}>
                                    <UserAvatar user={user} style={{ borderRadius: "8px" }} />
                                </Box>
                            );
                        }
                    })}
                    {users.length > 3 && (
                        <Box style={{
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <Typography
                                style={{
                                    fontWeight: "500",
                                    letterSpacing: "-0.035em",
                                    fontSize: "0.825rem"
                                }}
                                variant="body1"
                                gutterBottom
                            >
                                +{users.length - 3} Others
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Paper>
        </div>
    );
};

export default Boards;
