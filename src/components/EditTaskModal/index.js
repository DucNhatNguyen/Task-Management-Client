import React, { useEffect, useState, useContext } from "react";
import {
  Grid,
  Typography,
  Modal,
  IconButton,
  LinearProgress,
  Avatar,
} from "@mui/material";
import { Clear, Add, Edit } from "@mui/icons-material";
import {
  SectionTitle,
  LightButton,
  GrayButton,
  Attachment,
  CoverMenu,
  LabelsMenu,
  Label,
  Comment,
  EditInput,
  CommentInput,
  AssignMemberMenu,
  UserAvatar,
} from "components";
import { UserContext } from "provider/UserProvider";
import { Attachments } from "api/Task";

const imageFormats = [
  "APNG",
  "AVIF",
  "GIF",
  "PNG",
  "SVG",
  "WEBP",
  "JPEG",
  "JPG",
  "JFIF",
  "PJPEG",
  "PJP",
];

const EditTaskModal = ({
  open,
  handleClose,
  coverimage,
  taskTitle,
  listTitle,
  editDescription,
  editTitle,
  description,
  comments,
  labels,
  assigments,
  submitComment,
  deleteComment,
  editComment,
  attachments,
  addAttachment,
  deleteAttachment,
  addImageToTask,
  addLabel,
  deleteLabel,
  assignMemberToTask,
  removeAssignedMember,
  taskid,
  addItem
}) => {
  const { renderedBoard } = useContext(UserContext);

  const [displayEditArea, setDisplayEditArea] = useState(false);
  const [displayEditTitle, setDisplayEditTitle] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(false);

  const [uploadError, setUploadError] = useState();

  const [coverAnchorEl, setCoverAnchorEl] = useState(null);
  const [labelAnchorEl, setLabelAnchorEl] = useState(null);
  const [memberAnchorEl, setMemberAnchorEl] = useState(null);

  const [assignedUsers, setAssignedUsers] = useState([]);

  const handleEditTitleButtonClick = () => {
    setDisplayEditTitle(!displayEditTitle);
  };

  const closeEditTitle = () => {
    setDisplayEditTitle(false);
  };

  const handleEditButtonClick = () => {
    setDisplayEditArea(!displayEditArea);
  };

  const closeEditArea = () => {
    setDisplayEditArea(false);
  };

  const handleCoverButtonClick = (event) => {
    setCoverAnchorEl(event.currentTarget);
  };

  const handleCoverMenuClose = () => {
    setCoverAnchorEl(null);
  };

  const handleLabelButtonClick = (event) => {
    setLabelAnchorEl(event.currentTarget);
  };

  const handleLabelMenuClose = () => {
    setLabelAnchorEl(null);
  };

  const handleMemberButtonClick = (event) => {
    setMemberAnchorEl(event.currentTarget);
  };

  const handleMemberMenuClose = () => {
    setMemberAnchorEl(null);
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    setUploadError();

    if (files.length > 0) {
      setDisplayProgress(true);
      var formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 5000000) {
          setUploadError("Upload limit is 5mb! ");
        } else {
          formData.append(`files`, files[i]);
        }
      }
      await Attachments(formData, taskid)
        .then((res) => {
          const data = res.responseData
          for (let i = 0; i < data.length; i++) {
            addItem({
              id: data[i].id,
              name: data[i].name,
              filetype: data[i].filetype,
              fileurl: data[i].fileurl,
              uploaddate: data[i].uploaddate
            })
          }
          setDisplayProgress(false)
        })
        .catch((err) => {
          setDisplayProgress(false);
          setUploadError("Upload failed try uploading it later!");
        });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setUploadError();
    }, 5000);
  }, [uploadError]);

  useEffect(() => {
    if (renderedBoard) {
      const users = renderedBoard.members.filter((user) =>
        assigments.map(a => a.id).includes(user.id)
      );
      setAssignedUsers(users);
    }
  }, [assigments]);

  return (
    <Modal style={{
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      paddingTop: "64px",
      overflow: "scroll",
    }}
      sx={{
        "&::-webkit-scrollbar": {
          width: "0",
          background: "transparent",
        },
      }}
      open={open} onClose={() => handleClose()}>
      <div style={{
        backgroundColor: "white",
        width: "675px",
        minHeight: "350px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
        borderRadius: "8px",
        outlineColor: "white",
        outlineWidth: "0px"
      }}>
        <Grid style={{ padding: "20px" }} container>
          {/* image - close button */}
          <Grid
            style={{ marginBottom: "24px" }}
            item
            container
            justifyContent="end"
            xs={12}
          >
            <IconButton
              onClick={() => handleClose()}
              style={{
                backgroundColor: "#2F80ED",
                color: "white",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                width: "2rem",
                height: "2rem",
                padding: "18px",
                zIndex: "100",
                position: "absolute",
                marginTop: "-8px",
                marginRight: "-8px",
              }}
              sx={{
                "&:hover": {
                  backgroundColor: "rgb(32, 89, 165)",
                },
              }}
              aria-label="delete"
            >
              <Clear />
            </IconButton>
            {coverimage && (
              <img
                style={{
                  width: "100%",
                  height: "165px",
                  borderRadius: "8px",
                  objectFit: "contain",
                  padding: "12px",
                  background: "#F2F2F2",
                }}
                // src={coverimage + "&w=1280&q=80"}
                src={coverimage}
                alt="cover-img"
              />
            )}
          </Grid>
          {/*this is the left side of modal in big screens */}
          <Grid style={{ marginBottom: "24px" }} item container sm={8} xs={12}>
            <Grid item container xs={12}> {/*className={classes.taskTitleWrapper}> */}
              <Grid
                item
                xs={10}
                style={{ marginBottom: displayEditTitle ? "12px" : "0px" }}
              >
                {displayEditTitle ? (
                  <EditInput
                    handleClose={closeEditTitle}
                    editInput={editTitle}
                    value={taskTitle}
                    label="Title"
                  />
                ) : (
                  <Typography style={{
                    color: "black",
                    fontWeight: "normal",
                    fontSize: "1rem",
                    lineHeight: "22px",
                    letterSpacing: "-0.035em",
                    marginBottom: "8px"
                  }}>
                    {taskTitle}
                  </Typography>
                )}
              </Grid>
              <Grid
                item
                container
                justifyContent="end"
                alignItems="flex-start"
                xs={2}
              >
                <IconButton
                  onClick={handleEditTitleButtonClick}
                  style={{
                    borderRadius: "1px",
                    width: "50%",
                    padding: "0px",
                    paddingBottom: "4px",
                    paddingTop: "4px"
                  }}
                >
                  <Edit style={{ fontSize: "1rem" }} />
                </IconButton>
              </Grid>
            </Grid>
            {/*inlist - inprogress */}
            <Grid item container xs={12}>
              <Grid item>
                <Typography
                  style={{
                    color: "#BDBDBD",
                    fontWeight: 600,
                    fontSize: "0.725rem",
                    lineHeight: "15px",
                    letterSpacing: "-0.035em",
                    marginBottom: "20px"
                  }}
                >
                  in list
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  style={{
                    marginLeft: "8px", fontWeight: 600,
                    fontSize: "0.725rem",
                    lineHeight: "15px",
                    letterSpacing: "-0.035em",
                    marginBottom: "20px"
                  }}
                >
                  {listTitle}
                </Typography>
              </Grid>
            </Grid>
            {/* labels */}
            {labels && (
              <Grid
                item
                container
                spacing={3}
                xs={12}
                style={{ marginBottom: "16px" }}
              >
                {labels.map((label, key) => {
                  return (
                    <Grid
                      style={{ minWidth: "95px", maxWidth: "115px" }}
                      key={key}
                      item
                      xs
                    >
                      <Label
                        text={label.title}
                        id={label.id}
                        deleteLabel={deleteLabel}
                        color={label.colorhex}
                        style={{ width: "100%" }}
                      >
                        {label.title}
                      </Label>
                    </Grid>
                  );
                })}
              </Grid>
            )}

            {/*description - edit */}
            <Grid item container xs={12} style={{ marginBottom: "16px" }}>
              <Grid
                item
                container
                alignItems="center"
                style={{ width: "100px" }}
              >
                <SectionTitle title="Description" icon="description" />
              </Grid>
              <Grid item xs={2}>
                <LightButton
                  handleClick={handleEditButtonClick}
                  icon="edit"
                  text="Edit"
                />
              </Grid>
            </Grid>
            {/*description itself */}
            <Grid
              style={{
                display: displayEditArea ? "none" : "flex",
                marginBottom: "24px",
              }}
              item
              container
              xs={12}
            >
              <Typography style={{
                fontSize: "0.925rem",
                lineHeight: "21px",
                letterSpacing: "-0.035em",
                whiteSpace: "pre-line"
              }}>
                {description}
              </Typography>
            </Grid>
            {/*edit description */}
            <Grid
              style={{
                display: displayEditArea ? "flex" : "none",
                marginBottom: "24px",
              }}
              item
              container
              xs={12}
            >
              <EditInput
                value={description}
                editInput={editDescription}
                handleClose={closeEditArea}
                label="Description"
              />
            </Grid>
            {/* Attachment - Add */}
            <Grid item container xs={12} style={{ marginBottom: "16px" }}>
              <Grid
                item
                container
                alignItems="center"
                style={{ width: "100px" }}
              >
                <SectionTitle title="Attachment" icon="description" />
              </Grid>
              <Grid item xs={2}>
                <input
                  id="icon-button-file"
                  type="file"
                  multiple
                  name="files"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
                <label htmlFor="icon-button-file">
                  <IconButton
                    aria-label="upload file"
                    component="span"
                    style={{
                      border: "1px solid #BDBDBD",
                      borderRadius: "8px",
                      height: "24px"
                    }}
                  >
                    <Add style={{ fontSize: "1rem" }} />
                    <Typography
                      style={{
                        marginLeft: "8px",
                        lineHeight: "15px",
                        letterSpacing: "-0.035em",
                        fontSize: "0.725rem",
                        fontWeight: "600"
                      }}
                    >
                      Add
                    </Typography>
                  </IconButton>
                </label>
              </Grid>
              <Grid
                style={{
                  marginTop: "8px",
                  display: displayProgress ? "block" : "none",
                }}
                item
                xs={12}
              >
                <LinearProgress />
              </Grid>
              <Grid
                style={{
                  marginTop: "8px",
                  display: uploadError ? "block" : "none",
                }}
                item
                xs={12}
              >
                <Typography style={{
                  fontSize: "0.825rem",
                  color: "#f44336",
                  marginTop: "4px",
                  marginBottom: "4px"
                }}>
                  {uploadError}
                </Typography>
              </Grid>
            </Grid>
            {/*  attachment itself*/}
            <Grid item container xs={12}>
              <Grid item xs={12} style={{ marginBottom: "16px" }}>
                {attachments &&
                  attachments.map((attachment, key) => {
                    if (imageFormats.includes(attachment.filetype)) {
                      return (
                        <Attachment
                          key={key}
                          id={attachment.id}
                          title={attachment.name}
                          date={attachment.uploaddate}
                          image={true}
                          fileUrl={attachment.fileurl}
                          coverimage={coverimage}
                          deleteAttachment={deleteAttachment}
                          addImageToTask={addImageToTask}
                        />
                      );
                    } else {
                      return (
                        <Attachment
                          key={key}
                          id={attachment.id}
                          title={attachment.name}
                          date={attachment.uploadDate}
                          fileUrl={attachment.fileurl}
                          fileType={attachment.filetype}
                          deleteAttachment={deleteAttachment}
                        />
                      );
                    }
                  })}
              </Grid>
            </Grid>
            {/*  write a comment*/}
            <Grid item container xs={12} style={{ marginBottom: "8px" }}>
              <CommentInput handleButtonClick={submitComment} />
            </Grid>
            {/* comments */}
            <Grid item container xs={12}>
              {comments &&
                comments.map((val, key) => {
                  return (
                    <Comment
                      key={key}
                      comment={val}
                      deleteComment={deleteComment}
                      editComment={editComment}
                    />
                  );
                })}
            </Grid>
          </Grid>
          {/*this is the right side of modal in big screens */}
          <Grid
            item
            container
            sm={4}
            xs={12}
            style={{ display: "table", marginBottom: "24px" }}
          >
            {/*section title - Actions */}
            <Grid
              item
              container
              justify="flex-start"
              sx={{
                paddingLeft: "24px",
                marginBottom: "12px",
                height: "30px",
                // [theme.breakpoints.down("xs")]: {
                //   paddingLeft: "0px",
                // },
              }}
            >
              <SectionTitle title="Actions" icon="people" />
            </Grid>
            {/*Assign Members */}
            {!assigments.length > 0 && (
              <Grid
                sx={{
                  maxHeight: "60px",
                  display: "inline-flex",
                  marginBottom: "12px",
                  justifyContent: "flex-end",
                  // [theme.breakpoints.down("xs")]: {
                  //   justifyContent: "center",
                  // },
                }}
                item
                container
                justifyContent="end"
                xs={6}
                sm={12}
              >
                <GrayButton
                  icon="people"
                  text="Members"
                  handleClick={handleMemberButtonClick}
                />
                <AssignMemberMenu
                  anchorEl={memberAnchorEl}
                  handleClose={handleMemberMenuClose}
                  assigments={assigments}
                  assignMemberToTask={assignMemberToTask}
                  removeAssignedMember={removeAssignedMember}
                />
              </Grid>
            )}
            {/*Labels */}
            <Grid
              sx={{
                maxHeight: "60px",
                display: "inline-flex",
                marginBottom: "12px",
                justifyContent: "flex-end",
                // [theme.breakpoints.down("xs")]: {
                //   justifyContent: "center",
                // },
              }}
              item
              container
              sm={12}
              xs={6}
            >
              <GrayButton
                icon="label"
                text="Labels"
                handleClick={handleLabelButtonClick}
              />
              <LabelsMenu
                anchorEl={labelAnchorEl}
                handleClose={handleLabelMenuClose}
                addLabel={addLabel}
              />
            </Grid>
            {/*Cover */}
            <Grid
              sx={{
                maxHeight: "60px",
                display: "inline-flex",
                marginBottom: "12px",
                justifyContent: "flex-end",
                // [theme.breakpoints.down("xs")]: {
                //   justifyContent: "center",
                // },
              }}
              item
              container
              justifyContent="end"
              xs={6}
              sm={12}
            >
              <GrayButton
                icon="cover"
                text="Cover"
                handleClick={handleCoverButtonClick}
              />
              <CoverMenu
                anchorEl={coverAnchorEl}
                handleClose={handleCoverMenuClose}
                handleImageClick={addImageToTask}
              />
            </Grid>
            {/* Members */}
            {assignedUsers && assignedUsers.length > 0 && (
              <Grid
                style={{ maxHeight: "400px" }}
                item
                container
                xs={12}
                direction="column"
              >
                <Grid
                  item
                  container
                  justify="flex-start"
                  sx={{
                    paddingLeft: "24px",
                    marginBottom: "12px",
                    height: "30px",
                    // [theme.breakpoints.down("xs")]: {
                    //   paddingLeft: "0px",
                    // },
                  }}
                >
                  <SectionTitle title="Members" icon="people" />
                </Grid>
                {assignedUsers.map((user, index) => {
                  return (
                    <Grid
                      index={index}
                      sx={{
                        maxHeight: "60px",
                        display: "inline-flex",
                        marginBottom: "12px",
                        paddingLeft: "20px",
                        justifyContent: "flex-end",
                        // [theme.breakpoints.down("xs")]: {
                        //   justifyContent: "flex-start",
                        //   paddingLeft: "0px", 
                        // },
                      }}
                      container
                      onClick={() => removeAssignedMember(user.id)}
                    >
                      <Grid item container sm xs={8} sx={{
                        borderRadius: "8px",
                        maxHeight: "48px",
                        transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                        padding: "8px 6px",
                        "&:hover": {
                          backgroundColor: "#ffbaba",
                          cursor: "pointer",
                        },
                      }}>
                        <Grid item xs style={{ maxWidth: "32px" }} >
                          {/* <UserAvatar user={user} styles={{
                            borderRadius: "8px",
                            height: "32px",
                            width: "32px",
                          }} /> */}
                          <Avatar
                            src={user.avatar}
                            alt={user.fullname + " avatar"}
                            style={{
                              borderRadius: "8px",
                              width: "32px",
                              height: "32px",
                            }}
                          />
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
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "140px",
                            paddingLeft: "16px",
                          }}>
                            {user.fullname}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
                <Grid
                  item
                  container
                  justifyContent="end"
                  style={{
                    marginTop: "12px",
                    maxHeight: "60px",
                    display: "inline-flex",
                    marginBottom: "12px",
                    paddingLeft: "20px",
                    justifyContent: "flex-end",
                    // [theme.breakpoints.down("xs")]: {
                    //   justifyContent: "center",
                    //   paddingLeft: "0px"
                    // }, 
                  }}
                  xs={12}
                >
                  <IconButton
                    style={{
                      background: "#2f80ed38",
                      borderRadius: "8px",
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-evenly",
                      transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                      height: "40px"
                    }}
                    sx={{
                      "&:hover": {
                        background: "#2f80ed61",
                      },
                    }}
                    onClick={handleMemberButtonClick}
                  >
                    <Typography style={{
                      fontWeight: 500,
                      fontSize: "0.825rem",
                      lineHeight: "16px",
                      letterSpacing: "-0.035em",
                      color: "#2F80ED",
                    }}>
                      Assign a member
                    </Typography>
                    <Add style={{ color: "#2F80ED" }} />
                  </IconButton>
                  <AssignMemberMenu
                    anchorEl={memberAnchorEl}
                    handleClose={handleMemberMenuClose}
                    assigments={assigments}
                    assignMemberToTask={assignMemberToTask}
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};

export default EditTaskModal;