import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { withStyles } from "@mui/styles";
import { Add, AttachFile, Comment } from "@mui/icons-material";
import { Paper, Grid, Typography, IconButton, Snackbar, Alert } from "@mui/material";
import { UserAvatar, EditTaskModal } from "components";
import { UIContext } from "provider/UIProvider";
import { TaskHelpers } from "helpers";
import { taskStyles } from "./styles";
import { ActionLabel, Attachments, RemoveAttachments, AddComment } from "api/Task";

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            coverimage: "",
            title: "",
            description: "",
            comments: [],
            attachments: [],
            labels: [],
            members: [],
            open: false,
            messageAlert: ""
        };
    }
    static contextType = UIContext;

    handleTaskClick = () => {
        this.setState({ modalVisible: true });
    };
    closeEditModal = () => {
        this.setState({ modalVisible: false });
    };
    handleClose = () => {
        this.setState({ open: false, messageAlert: "" });
    };
    handleTitleChange = (title) => {
        this.setState({ title: title, open: true, messageAlert: "Đã cập nhật tiêu đề cho công việc" });
        TaskHelpers.HandleTaskPropertyUpdate(
            this.context.renderedBoard,
            this.props.task.id,
            "Title",
            title
        )
            .catch((err) => console.log(err));


    };
    handleDescriptionChange = (description) => {
        this.setState({ description: description, open: true, messageAlert: "mô tả" });
        TaskHelpers.HandleTaskPropertyUpdate(
            this.context.renderedBoard,
            this.props.task.id,
            "Description",
            description
        ).catch((err) => console.log(err));
    };
    submitComment = (comment) =>
        new Promise((resolve, reject) => {
            AddComment({
                id: comment.id,
                userid: comment.userid,
                text: comment.text,
                createdBy: comment.createdBy,
            }, this.props.task.id)
                .then((res) => {
                    this.setState(
                        {
                            comments: [...this.state.comments, res.responseData],
                            open: true, messageAlert: "Đã thêm bình luận cho công việc này"
                        })
                    resolve("Property updated successfully!")
                })
                .catch((err) => reject("Property update failed"))
        });
    deleteComment = (commentId) => {
        let comments = this.state.comments;
        for (let i = 0; i < comments.length; i++) {
            const comment = comments[i];
            if (comment.id === commentId) {
                // remove id matched comment
                comments.splice(i, 1);
                this.setState({ comments: comments, open: true, messageAlert: "Đã xóa bình luận khỏi công việc này" }, () => {
                    TaskHelpers.HandleTaskPropertyUpdate(
                        this.context.renderedBoard,
                        this.props.task.id,
                        "DeleteComment",
                        comment.id
                    ).catch((err) => console.log(err));
                });
            }
        }
    };
    editComment = (commentId, comment) => {
        let comments = this.state.comments;
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].id === commentId) {
                // remove id matched comment
                comments[i].text = comment;
                const newArrComment = this.state.comments.map(({ user, ...rest }) => {
                    return rest;
                });
                this.setState({ comments: comments, open: true, messageAlert: "Đã sửa bình luận cho công việc này" }, () => {
                    TaskHelpers.HandleTaskPropertyUpdate(
                        this.context.renderedBoard,
                        this.props.task.id,
                        "EditComment",
                        newArrComment.filter(i => i.id === commentId)
                    ).catch((err) => console.log(err));
                });
            }
        }
    };
    addItem = (item) => {
        this.setState(state => ({
            attachments: [...state.attachments, item]
        }));
    }
    addAttachment = (formData) => {
        this.setState({ open: true, messageAlert: "Đã thêm file cho công việc" });
        // new Promise(async (resolve, reject) => {
        // });
    }
    deleteAttachment = (attachmentId) => {
        let attachments = this.state.attachments;
        for (let i = 0; i < attachments.length; i++) {
            const attachment = attachments[i];
            if (attachment.id === attachmentId) {
                // remove id matched comment
                attachments.splice(i, 1);
                this.setState({ attachments: attachments }, () => {
                    RemoveAttachments(attachment.id)
                        .catch((err) => console.log(err))
                });
            }
        }
        this.setState({ open: true, messageAlert: "Đã xóa file cho công việc" });
    };
    handleSearchedImageClick = (regular) => {
        this.setState(
            {
                coverimage: regular,
            },
            () => {
                TaskHelpers.HandleTaskPropertyUpdate(
                    this.context.renderedBoard,
                    this.props.task.id,
                    "Coverimage",
                    this.state.coverimage
                ).then((res) => this.setState({ open: true, messageAlert: "Đã cập nhật ảnh bìa cho công việc" }));
            }
        );
    };
    addLabel = (label) => {
        this.setState(
            {
                labels: [...this.state.labels, {
                    colorhex: label.color.hex,
                    colorname: label.color.name,
                    id: label.id,
                    taskid: this.props.task.id,
                    title: label.input
                }],
                open: true,
                messageAlert: "Đã thêm nhãn gán cho công việc"
            },
            () => {
                ActionLabel({
                    taskId: this.props.task.id,
                    id: label.id,
                    title: label.input,
                    color: label.color,
                    actiontype: 1
                }).catch((err) => console.log(err));
            }
        );
    };
    deleteLabel = (labelId) => {
        let labels = this.state.labels;
        for (let i = 0; i < labels.length; i++) {
            const label = labels[i];
            if (label.id === labelId) {
                // remove id matched label
                labels.splice(i, 1);
                this.setState({ labels: labels, open: true, messageAlert: "Đã xóa nhãn gán cho công việc" }, () => {
                    ActionLabel({
                        taskId: label.taskid,
                        id: label.id,
                        title: label.title,
                        color: {
                            hex: label.colorhex,
                            name: label.colorname
                        },
                        actiontype: 2
                    }).catch((err) => console.log(err));
                });
            }
        }
    };
    assignMemberToTask = (assignedUser) => {
        this.setState(
            {
                members: [...this.state.members, assignedUser],
                open: true,
                messageAlert: `Đã thêm ${assignedUser.fullname} vào công việc`
            },
            () => {
                TaskHelpers.HandleTaskPropertyUpdate(
                    this.context.renderedBoard,
                    this.props.task.id,
                    "Members",
                    assignedUser.id
                );
            }
        );
    }
    removeAssignedMember = (user) => {
        let assigments = this.state.members;
        assigments = assigments.filter(x => x.id !== user.id);
        this.setState({
            members: assigments,
            open: true,
            messageAlert: `Đã xóa ${user.fullname} ra khỏi công việc`
        }, () => {
            TaskHelpers.HandleTaskPropertyUpdate(
                this.context.renderedBoard,
                this.props.task.id,
                "RemoveMember",
                user.id
            ).catch((err) => console.log(err));
        });
    };
    componentDidMount() {
        const {
            coverimage,
            title,
            description,
            comments,
            attachments,
            labels,
            members
        } = this.props.task;
        this.setState({
            coverimage: coverimage || "",
            title: title || " ",
            description: description || " ",
            comments: comments || [],
            attachments: attachments || [],
            labels: labels || [],
            members: members || [],
        });
    }
    render() {
        const { classes, task, index } = this.props;
        const {
            coverimage,
            title,
            comments,
            attachments,
            labels,
            members,
        } = this.state;
        const { renderedBoard } = this.context;

        let avatarCounter = 0;

        return (
            <Draggable draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                    <div
                        className={
                            snapshot.isDragging ? classes.dragging : classes.container
                        }
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <Paper
                            className={classes.paper}
                            style={{ transform: snapshot.isDragging && "rotate(3.5deg)" }}
                            onClick={this.handleTaskClick}
                            onMouseEnter={() =>
                                this.setState({
                                    taskHover: true,
                                })
                            }
                            onMouseLeave={() =>
                                this.setState({
                                    taskHover: false,
                                })
                            }
                        >
                            {coverimage && (
                                <img
                                    alt="task-cover"
                                    className={classes.cover}
                                    // src={coverimage + "&q=80&w=400"}
                                    src={coverimage}
                                />
                            )}
                            <Grid container>
                                <Grid item xs={10}>
                                    <Typography
                                        className={classes.title}
                                        variant="body1"
                                        gutterBottom
                                    >
                                        {title}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    xs={12}
                                    justify="flex-start"
                                    style={{ marginBottom: "16px" }}
                                >
                                    {labels &&
                                        labels.map((label, index) => {
                                            return (
                                                <Grid
                                                    className={classes.labelContainer}
                                                    style={{
                                                        backgroundColor: label.colorhex, borderRadius: "14px",
                                                        padding: "3px 0px",
                                                        width: "60px",
                                                        marginBottom: '8px',
                                                        marginRight: '12px',
                                                    }}
                                                    item
                                                    container
                                                    alignItems="center"
                                                    justifyContent="space-around"
                                                    index={index}
                                                    key={index}
                                                >
                                                    <Grid item xs={5}>
                                                        <Typography style={{
                                                            fontWeight: "500",
                                                            fontSize: "0.625rem",
                                                            lineHeight: "14px",
                                                            letterSpacing: "-0.035em",
                                                            paddingBottom: "4px",
                                                            paddingTop: "4px",
                                                            textAlign: "center",
                                                            color: "white",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                        }}>
                                                            {label.title}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            );
                                        })}
                                </Grid>
                            </Grid>
                            <Grid item container xs={12}>
                                {members &&
                                    renderedBoard &&
                                    renderedBoard.members.map((user, index) => {
                                        if (
                                            members.map(a => a.id).includes(user.id) &&
                                            !(members.length > 2 && avatarCounter > 0)
                                        ) {
                                            avatarCounter += 1;
                                            return (
                                                <Grid
                                                    item
                                                    style={{
                                                        width: "35px",
                                                        height: "35px",
                                                        marginRight: "8px",
                                                    }}
                                                    index={index}
                                                    key={index}
                                                >
                                                    <UserAvatar
                                                        user={user}
                                                        styles={classes.memberAvatar}
                                                        isTask={true}
                                                    />
                                                </Grid>
                                            );
                                        }
                                        if (index === renderedBoard.members.length - 1)
                                            avatarCounter = 0;
                                        return null;
                                    })}
                                {members && members.length > 2 ? (
                                    <Grid item className={classes.othersContainer}>
                                        <Typography
                                            className={classes.othersInfo}
                                            variant="body2"
                                            gutterBottom
                                        >
                                            +{members.length - 1} Others
                                        </Typography>
                                    </Grid>
                                ) : (
                                    <Grid
                                        item
                                        style={{
                                            width: "35px",
                                            height: "35px",
                                        }}
                                    >
                                        <IconButton className={classes.addButton}>
                                            <Add style={{ color: "white" }} />
                                        </IconButton>
                                    </Grid>
                                )}
                                <Grid
                                    item
                                    container
                                    xs
                                    justifyContent="end"
                                    className={classes.propertyCounter}
                                >
                                    {comments && comments.length > 0 && (
                                        <Grid
                                            item
                                            container
                                            justify="center"
                                            alignItems="center"
                                            xs={4}
                                            style={{ maxWidth: "35px" }}
                                        >
                                            <Comment className={classes.propertyIcon} />
                                            {comments.length}
                                        </Grid>
                                    )}
                                    {attachments && attachments.length > 0 && (
                                        <Grid
                                            item
                                            container
                                            justify="center"
                                            alignItems="center"
                                            xs={4}
                                            style={{ maxWidth: "35px" }}
                                        >
                                            <AttachFile className={classes.propertyIcon} />
                                            {attachments.length}
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                            {/* z */}
                        </Paper>
                        <EditTaskModal
                            open={this.state.modalVisible}
                            handleClose={this.closeEditModal}
                            editTitle={this.handleTitleChange}
                            editDescription={this.handleDescriptionChange}
                            coverimage={this.state.coverimage}
                            labels={this.state.labels}
                            listTitle={this.props.listTitle}
                            taskTitle={this.state.title}
                            description={this.state.description}
                            comments={this.state.comments}
                            assigments={this.state.members}
                            addImageToTask={this.handleSearchedImageClick}
                            submitComment={this.submitComment}
                            deleteComment={this.deleteComment}
                            editComment={this.editComment}
                            attachments={this.state.attachments}
                            addAttachment={this.addAttachment}
                            deleteAttachment={this.deleteAttachment}
                            addLabel={this.addLabel}
                            deleteLabel={this.deleteLabel}
                            assignMemberToTask={this.assignMemberToTask}
                            removeAssignedMember={this.removeAssignedMember}
                            taskid={this.props.task.id}
                            addItem={this.addItem}
                        />
                        <Snackbar
                            open={this.state.open}
                            autoHideDuration={6000}
                            onClose={this.handleClose}
                            message={this.state.messageAlert}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            severity="success"
                        //action={action}
                        >
                            <Alert onClose={this.handleClose} severity="success" sx={{ width: '100%' }}>
                                {this.state.messageAlert}
                            </Alert>
                        </Snackbar>
                    </div>
                )}
            </Draggable>
        );
    }
}

export default withStyles(taskStyles)(Task);
