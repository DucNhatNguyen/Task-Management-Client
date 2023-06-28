import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  Button,
  Avatar,
  Typography,
  CircularProgress,
} from "@mui/material";
//import { GetUniqueId } from "api/Common";
//import { UserContext } from "provider/UserProvider";
import { UserAvatar } from "components";
import { CommentInput } from "./styles";

const EditDescription = ({ handleButtonClick }) => {
  //const { userData } = useContext(UserContext);
  const userData = {
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
  const [comment, setComment] = useState("");
  const [time, setTime] = useState();
  const [commentError, setCommentError] = useState();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const handleCommentButton = async () => {
    setLoading(true);
    setCommentError();
    if (comment.trim() <= 0) {
      setCommentError("You can't submit empty comment!");
      setLoading(false);
    } else {
    //   const id = await GetUniqueId();
    //   const response = await handleButtonClick({
    //     id: id.data,
    //     uid: userData.uid,
    //     name: userData.name,
    //     picture: userData.picture,
    //     text: comment,
    //     time: time || "24 August at 20:43",
    //   });
    //   if (response) {
    //     setLoading(false);
    //   } else {
    //     setLoading(false);
    //     setCommentError(`Couldn't submit the comment!`);
    //   }
    //   setComment(" ");
    }
  };

  useEffect(() => {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString("en-EN", { month: "long" });
    const time = now.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    setTime(day + " " + month + " at " + time);
  }, [comment]);

  useEffect(() => {
    setTimeout(() => {
      setCommentError();
    }, 5000);
  }, [commentError]);

  return (
    <>
      <Grid container style={{
        border: "1px solid #E0E0E0",
        boxSizing: "border-box",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        minHeight: "100px",
        padding: "16px"
      }} justify="space-around">
        <Grid item sm={1} xs={2}>
          <UserAvatar user={userData} styles={{borderRadius: "8px"}} />
        </Grid>
        <Grid item xs={10} style={{ margin: "auto" }}>
          <CommentInput
            value={comment}
            onChange={handleChange}
            label="Write a comment..."
            variant="outlined"
            multiline
            rowsMax={4}
            rows={1}
          />
        </Grid>
        <Grid item container xs={12} justifyContent="end">
          <Grid item sm={3} xs={4}>
            <Button
              style={{
                width: "90%",
                marginRight: "10px",
                marginTop: "8px",
                borderRadius: "8px",
                fontWeight: 500,
                fontSize: "0.775rem",
                lineHeight: "14px",
                letterSpacing: "-0.035em",
                height: "32px",
              }}
              variant="contained"
              color="primary"
              onClick={handleCommentButton}
              disabled={loading}
            >
              Comment
            </Button>
            {loading && (
              <CircularProgress size={24} style={{
                color: "yellow",
                position: "absolute",
                marginTop: -25,
                marginLeft: 35,
              }} />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        style={{ marginTop: "8px", display: commentError ? "block" : "none" }}
        item
        container
        xs={12}
      >
        <Typography style={{
            fontSize: "0.825rem",
            color: "#f44336",
            marginTop: "4px",
            marginBottom:"4px",
            paddingLeft: "4px",
        }}>{commentError}</Typography>
      </Grid>
    </>
  );
};

export default EditDescription;