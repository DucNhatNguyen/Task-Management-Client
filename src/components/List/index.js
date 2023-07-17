import React from "react";
import { UserContext } from "provider/UserProvider";
import { ListHelpers } from "helpers";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { IconButton, Grid, Typography } from "@mui/material";
import { AddTaskModal, TaskColumn } from "components";
import { Add, MoreHoriz } from "@mui/icons-material";
import { withStyles } from "@mui/styles";
import { listStyles } from "./styles";
import ListMenu from "components/ListMenu";
import RenameMenu from "components/RenameMenu";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addCardAnchorEl: null,
            listMenuAnchorEl: null,
            renameMenuAnchorEl: null,
        };
        this.listContainerRef = React.createRef();
    }

    static contextType = UserContext;

    handleNameInputClose = () => {
        this.setState({
            addCardAnchorEl: null,
        });
    };

    handleListMenuClose = () => {
        this.setState({
            listMenuAnchorEl: null,
        });
    };

    handleRenameMenuClose = () => {
        this.setState({
            renameMenuAnchorEl: null,
        });
    };

    handleAddAnotherCardButtonClick = (event) => {
        this.setState({
            addCardAnchorEl: event.currentTarget,
        });
    };

    handleListMenuButtonClick = (event) => {
        this.setState({
            listMenuAnchorEl: event.currentTarget,
        });
    };

    handleRenameButtonClick = () => {
        this.setState({
            renameMenuAnchorEl: this.listContainerRef.current,
        });
    };

    handleDeleteButtonClick = () => {
        let { renderedBoard, setRenderedBoard } = this.context;
        if (renderedBoard && renderedBoard.lists) {
            let newState = { ...renderedBoard };
            delete newState.lists[this.props.list.id];
            ListHelpers.HandleDeletingList(renderedBoard, this.props.list.id)
                .then(() => {
                    setRenderedBoard(newState);
                })
                .catch((error) => console.log(error));
        }
    };

    render() {
        const { classes, createNewTask, list, index } = this.props;
        return (
            <Draggable draggableId={list.id} index={index}>
                {(provided, snapshot) => (
                    <div {...provided.draggableProps} ref={provided.innerRef}>
                        <div
                            style={{
                                transform: snapshot.isDragging && "rotate(3.5deg)",
                                margin: "8px",
                                border: "1px solid lightgrey",
                                backgroundColor: "#f5f5f5",
                                borderRadius: "8px",
                                width: "280px",
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            <Grid
                                container
                                {...provided.dragHandleProps}
                                ref={this.listContainerRef}
                            >
                                <Grid item container xs={9} style={{
                                    padding: "8px",
                                    fontWeight: "600"
                                }}>
                                    {this.props.list.title}
                                </Grid>
                                <Grid item container xs={3} justifyContent="end">
                                    <IconButton
                                        onClick={this.handleListMenuButtonClick}
                                        style={{ padding: "8px" }}
                                    >
                                        <MoreHoriz />
                                    </IconButton>
                                </Grid>
                                <ListMenu
                                    anchorEl={this.state.listMenuAnchorEl}
                                    handleClose={this.handleListMenuClose}
                                    renameButtonClick={this.handleRenameButtonClick}
                                    deleteButtonClick={this.handleDeleteButtonClick}
                                    listId={this.props.list.id}
                                />
                                <RenameMenu
                                    anchorEl={this.state.renameMenuAnchorEl}
                                    handleClose={this.handleRenameMenuClose}
                                    listTitle={this.props.list.title}
                                    listId={this.props.list.id}
                                />
                            </Grid>
                            <Droppable droppableId={list.id} type="task">
                                {(provided, snapshot) => (
                                    <div
                                        style={
                                            snapshot.isDraggingOver
                                                ? {
                                                    padding: "8px",
                                                    transition: "background-color 0.2s ease",
                                                    backgroundColor: "lightgrey",
                                                    flexGrow: "1",
                                                    minHeight: "100px",
                                                }
                                                : {
                                                    padding: "8px",
                                                    transition: "background-color 0.2s ease",
                                                    backgroundColor: "inherit",
                                                    flexGrow: "1",
                                                }
                                        }
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <TaskColumn list={list} tasks={this.props.tasks} />
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            <div style={{
                                padding: "8px",
                                fontWeight: "600"
                            }}>
                                <div style={{ padding: "0px 6px" }}>
                                    <IconButton
                                        style={{
                                            maxHeight: "45px",
                                            width: "250px",
                                            marginTop: "8px",
                                            borderRadius: "8px",
                                            textAlign: "start",
                                            alignItems: "start"
                                        }}
                                        sx={{
                                            "&:hover": {
                                                backgroundColor: "rgba(0, 0, 0, 0.04)",
                                            },
                                        }}
                                        aria-label="cover"
                                        onClick={(e) => {
                                            this.handleAddAnotherCardButtonClick(e);
                                        }}
                                    >
                                        <Grid item xs={10}>
                                            <Typography style={{
                                                fontSize: "0.875rem",
                                                fontWeight: "500",
                                            }} component="p">
                                                Add another card
                                            </Typography>
                                        </Grid>
                                        <Grid item container xs={2}>
                                            <Add className={classes.menuIcon} />
                                        </Grid>
                                    </IconButton>
                                    <AddTaskModal
                                        anchorEl={this.state.addCardAnchorEl}
                                        handleClose={this.handleNameInputClose}
                                        createNewTask={createNewTask}
                                        list={list}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
        );
    }
}

export default withStyles(listStyles)(List);
