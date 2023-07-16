import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { LightButton } from "components";

const Attachment = ({
  id,
  title,
  date,
  fileUrl,
  fileType,
  image,
  coverImage,
  deleteAttachment,
  addImageToTask,
}) => {
  const [displayDeleteDialog, setDisplayDeleteDialog] = useState(false);

  const handleDeleteButtonClick = () => {
    setDisplayDeleteDialog(!displayDeleteDialog);
  };

  const closeDeleteDialog = () => {
    setDisplayDeleteDialog(false);
  };

  const handleDeleteComment = () => {
    deleteAttachment(id);
    closeDeleteDialog();
  };

  return (
    <Grid container style={{ marginBottom: "16px" }}>
      <Grid item style={{ width: "100px" }}>
        {image ? (
          <img
            style={{
              width: "100%",
              height: "66px",
              padding: "12px",
              objectFit: "scale-down",
              borderRadius: "8px",
              backgroundColor: "#F2F2F2"
            }}
            src={process.env.REACT_APP_DOMAIN + fileUrl}
            alt={title} />
        ) : (
          fileType && (
            <div style={{
              borderRadius: "8px",
              width: "100%",
              height: "66px",
              backgroundColor: "#E0E0E0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Typography style={{
                fontSize: "0.725rem",
                fontWeight: "500",
                lineHeight: "15px",
                letterSpacing: "-0.035rem",
                color: "#4F4F4F"
              }}>{fileType}</Typography>
            </div>
          )
        )}
      </Grid>
      <Grid item xs={9} style={{
        paddingLeft: "16px",
      }}>
        <Grid item xs={12}>
          <Typography style={{
            color: "#BDBDBD",
            fontSize: "0.65rem",
            fontWeight: "500",
            lineHeight: "12px",
            letterSpacing: "-0.035rem",
            marginTop: "8px",
            marginBottom: "4px"
          }}>Added on {date}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography style={{
            fontSize: "0.725rem",
            fontWeight: "500",
            lineHeight: "15px",
            letterSpacing: "-0.035rem",
            color: "#4F4F4F",
            marginBottom: "8px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: 'ellipsis'
          }}>
            {title}
          </Typography>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={3}>
            <a
              href={process.env.REACT_APP_DOMAIN + fileUrl}
              download="safd.png"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <LightButton text="Download" />
            </a>
          </Grid>
          <Grid item xs={3} style={{ marginLeft: "14px" }}>
            <div
              style={{ display: "inline-flex" }}
              onClick={handleDeleteButtonClick}
            >
              <LightButton text="Delete" />
            </div>
            <Dialog
              open={displayDeleteDialog}
              onClose={closeDeleteDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle>{"Delete this attachment?"}</DialogTitle>
              <DialogActions>
                <Button onClick={closeDeleteDialog} color="primary">
                  Go Back
                </Button>
                <Button
                  onClick={handleDeleteComment}
                  style={{ color: "#f44336" }}
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
          {image && fileUrl && fileUrl !== coverImage && (
            <Grid item container alignItems="center" xs={5}>
              <div onClick={() => addImageToTask(process.env.REACT_APP_DOMAIN + fileUrl)}>
                <Typography style={{
                  fontSize: "0.725rem",
                  fontWeight: 500
                }}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  Set Cover Image
                </Typography>
              </div>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid >
  );
};

export default Attachment;