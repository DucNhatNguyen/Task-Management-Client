import React, { useEffect, useState, useContext } from "react";
import { Typography, Grid, Button } from "@mui/material";
import { UserContext } from "provider/UserProvider";
import { BoardHelpers } from "helpers";
import { PopMenu } from "./styles";
import useDebounce from "hooks/useDebounce";
import { SearchMembers } from "api/Board";
import UserAvatar from "components/UserAvatar";

const InviteUserMenu = ({ boardId, anchorEl, handleClose }) => {
    const { renderedBoard, setRenderedBoard } = useContext(UserContext);

    const [input, setInput] = useState("");
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const [searchMember, setSearchMember] = useState();
    
    // DeBounce Function
  useDebounce(() => {
    if(input.trim().length > 0){
        SearchMembers(input).then((res) => {
        if (res.responseCode === 200){
            if (res.responseData && res.responseData.length > 0){
                setSearchMember(
                    res.responseData.filter((d) => d.fullname.toLowerCase().includes(input.toLowerCase()))
                );
            } else {
                setError("Không tìm thấy thông tin thành viên!");
            }
        }
    })} else {
        setSearchMember([])
    }
    }, [input], 800
  );

    useEffect(() => {
        setError("");
    }, [input]);

    const handleInviteButtonClick = () => {
        if (!input.trim().length > 0) {
            setError("Không được để trống!");
        } else if (renderedBoard.members.filter(i => i.fullname.toLowerCase() === input.toLowerCase()).length > 0) {
            setError("Thành viên này đã có trong board");
        } else {
            setLoading(true);
            BoardHelpers.HandleInvitingUser(boardId, input)
                .then((response) => {
                    setLoading(false);
                    if (response.responseCode === 500) {
                        setError("Có lỗi xảy ra!");
                    } else if (response.responseCode === 200) {
                        let board = { ...renderedBoard };
                        board.members.push(response.responseData);
                        setRenderedBoard(board);
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

    const handleMemberClick = (fullname) => {
        setInput(fullname)
    }
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
                            Thêm thành viên
                        </Typography>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <Typography className={{
                            marginTop: "4px",
                            color: "#828282",
                            fontSize: "0.875rem",
                        }} 
                        component="p">
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
                            placeholder="Tên"
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
                                {error}
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
                            Mời
                        </Button>
                    </Grid>
                </Grid>

                {searchMember &&
          searchMember.length > 0 && (
            <Grid item container style={{
              background: "#FFFFFF",
              border: "1px solid #E0E0E0",
              borderRadius: "8px",
              boxShadow: "0px 2px 8px rgb(0 0 0 / 10%)",
              margin: "auto",
              marginBottom: "12px",
              padding: "8px",
            }} xs={11}>
              {searchMember &&
                searchMember.map((user, index) => {
                  return (
                    <Grid
                      index={index}
                      item
                      container
                      xs={12}
                      style={{
                        padding: "8px",
                        marginBottom: "8px",
                        borderRadius: "8px",
                        transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                      }}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#d7ffd9",
                          cursor: "pointer",
                        }
                      }}
                      onClick={() => handleMemberClick(user.fullname)}
                      key={index}
                    >
                      <Grid item xs style={{ maxWidth: "32px" }}>
                        <UserAvatar user={user} styles={{
                          borderRadius: "8px",
                          height: "2rem",
                          width: "2rem"
                        }} />
                      </Grid>
                      <Grid
                        item
                        container
                        alignItems="center"
                        xs
                        style={{ maxWidth: "180px" }}
                      >
                        <Typography style={{
                          fontWeight: 600,
                          fontSize: "0.875rem",
                          lineHeight: "18px",
                          letterSpacing: "-0.035em",
                          paddingLeft: "16px"
                        }}>
                          {user.fullname}
                        </Typography>
                      </Grid>
                    </Grid>
                  );
                })}
            </Grid>
          )}
            </PopMenu>
        </div>
    );
};

export default InviteUserMenu;
