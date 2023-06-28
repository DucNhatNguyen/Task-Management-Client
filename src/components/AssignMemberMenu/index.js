import React, { useState, useContext, useEffect } from "react";
import { Typography, Grid, Avatar } from "@mui/material";
import { UserAvatar } from "components";
// import { UserContext } from "provider/UserProvider";
import { PopMenu } from "./styles";

const AssignMemberMenu = ({
  anchorEl,
  handleClose,
  assigments,
  assignMemberToTask,
}) => {

//   const { renderedBoard } = useContext(UserContext);
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
  const [input, setInput] = useState("");
  const [memberList, setMemberList] = useState([]);

  const handleMemberClick = (uid) => {
    assignMemberToTask(uid);
    handleClose();
  };

  useEffect(() => {
    if (input.length > 0) {
      const list = memberList.filter((member) => {
        const name = member.name.toUpperCase();
        const text = input.toUpperCase();
        return name.includes(text);
      });
      setMemberList(list);
    }
  }, [input]);

//   useEffect(() => {
//     if (assigments && renderedBoard.userData) {
//       const list = renderedBoard.userData.filter(
//         (user) => !assigments.includes(user.uid)
//       );
//       setMemberList(list);
//     }
//   }, [assigments, renderedBoard.userData]);

  const handleOnKeyDown = (e) => {
    e.stopPropagation();
  };

  return (
    <div>
      <PopMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => {
          handleClose();
          setInput("");
        }}
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
              Assign Member
            </Typography>
          </Grid>
        </Grid>
        <Grid style={{
            paddingLeft: "12px",
            paddingRight: "12px",
            paddingTop: "14.4px",
            paddingBottom: "14.4px",
        }} item container>
          <Grid item container xs={12} style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgb(0 0 0 / 15%)",
          }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Name"
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
                borderRadius: "8px",
              }}
              onKeyDown={handleOnKeyDown}
            />
          </Grid>
        </Grid>
        {renderedBoard.userData &&
          renderedBoard.userData.length !== assigments.length && (
            <Grid item container style={{
                background: "#FFFFFF",
                border: "1px solid #E0E0E0",
                borderRadius: "8px",
                boxShadow: "0px 2px 8px rgb(0 0 0 / 10%)",
                margin: "auto",
                marginBottom: "12px",
                padding: "8px",
            }} xs={11}>
              {memberList &&
                memberList.map((user, index) => {
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
                      onClick={() => handleMemberClick(user.uid)}
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
                          {user.name}
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

export default AssignMemberMenu;