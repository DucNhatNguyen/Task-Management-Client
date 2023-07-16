import React, { useContext, useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { UserContext } from "provider/UserProvider";
import { EditInput, UserAvatar } from "components";
import { TaskHelpers } from "helpers"

const Comment = ({ comment, deleteComment, editComment }) => {
  const { userData } = useContext(UserContext);

  const [owner, setOwner] = useState(false);

  const [displayEditArea, setDisplayEditArea] = useState(false);
  const [displayDeleteDialog, setDisplayDeleteDialog] = useState(false);
  const [time, setTime] = useState(TaskHelpers.HandleTimeComment(comment.createdtime))
  const handleEditButtonClick = () => {
    setDisplayEditArea(!displayEditArea);
  };

  const closeEditArea = () => {
    setDisplayEditArea(false);
  };

  const handleEditComment = (input) => {
    editComment(comment.id, input);
  };

  const handleDeleteButtonClick = () => {
    setDisplayDeleteDialog(!displayDeleteDialog);
  };

  const closeDeleteDialog = () => {
    setDisplayDeleteDialog(false);
  };

  const handleDeleteComment = () => {
    deleteComment(comment.id);
    closeDeleteDialog();
  };

  useEffect(() => {
    if (userData.id === comment.userid) {
      console.log('nguoi comment chinh chu')
      setOwner(true);
    }
  }, [userData]);

  return (
    <Grid container style={{
      minHeight: "100px",
      padding: "16px",
      borderBottom: "1px solid #F2F2F2",
      marginTop: "8px",
      marginBottom: "8px",
    }}>
      <Grid item container xs={12} justify="space-between">
        <Grid item xs={1} style={{ marginRight: "20px" }}>
          <UserAvatar user={comment.user} styles={{ borderRadius: "8px" }} />
        </Grid>
        <Grid item container xs={7} style={{ paddingLeft: "7px" }}>
          <Grid item xs={12}>
            <Typography style={{
              fontWeight: 500,
              fontSize: "0.85rem",
              lineHeight: "18px",
              letterSpacing: "-0.035em",
              color: "black"
            }}>{comment.createdby}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography style={{
              fontWeight: 500,
              fontSize: "0.725rem",
              lineHeight: "14px",
              letterSpacing: "-0.035em",
              color: "#BDBDBD"
            }}>{time}</Typography>
          </Grid>
        </Grid>
        <Grid item container xs={3} justifyContent="end">
          {owner && (
            <>
              <Grid item xs={3}>
                <Typography
                  onClick={handleEditButtonClick}
                  style={{
                    fontWeight: "500",
                    fontSize: "0.725rem",
                    lineHeight: "15px",
                    letterSpacing: "-0.035em",
                    color: "rgba(130,130,130,0.7)",
                    textDecoration: "underline"
                  }}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                      color: "rgba(130,130,130,1)",
                    },
                  }}
                >
                  Edit
                </Typography>
              </Grid>
              <Grid
                item
                xs={1}
                style={{
                  marginLeft: "5px",
                  marginRight: "10px",
                  marginTop: "-2.5px",
                }}
              >
                -
              </Grid>
              <Grid item xs={3}>
                <Typography
                  onClick={handleDeleteButtonClick}
                  style={{
                    fontWeight: "500",
                    fontSize: "0.725rem",
                    lineHeight: "15px",
                    letterSpacing: "-0.035em",
                    color: "rgba(130,130,130,0.7)",
                    textDecoration: "underline"
                  }}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                      color: "rgba(130,130,130,1)",
                    },
                  }}
                >
                  Delete
                </Typography>
              </Grid>
              <Dialog
                open={displayDeleteDialog}
                onClose={closeDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle>{"Delete this comment?"}</DialogTitle>
                <DialogActions>
                  <Button onClick={closeDeleteDialog} color="primary">
                    Go Back
                  </Button>
                  <Button
                    onClick={handleDeleteComment}
                    style={{ color: "#f44336" }}
                    autoFocus
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </Grid>
      </Grid>
      <Grid item container xs={12} style={{ marginTop: "16px" }}>
        {displayEditArea ? (
          <EditInput
            handleClose={closeEditArea}
            editInput={handleEditComment}
            value={comment.text}
            label="Comment"
          />
        ) : (
          <Typography style={{
            fontWeight: "normal",
            fontSize: "0.875rem",
            lineHeight: "19px",
            letterSpacing: "-0.035em",
            whiteSpace: "pre-line"
          }}>{comment.text}</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Comment;