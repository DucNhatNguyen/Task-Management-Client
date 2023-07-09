import React from "react";
import { v4 as uuidv4 } from 'uuid';
import shortid from "shortid";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { IconButton, Grid, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import { Add } from "@mui/icons-material";
import { AddListModal, ListColumn } from "components";
import { UserContext } from "provider/UserProvider";
import { BoardHelpers } from "helpers";
import { canvasStyles } from "./styles";
import { GetBoardColumns } from "api/Board";
import { GetTaskByBoardId } from "api/Task";

class DndCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        };
    }
    static contextType = UserContext;

    componentDidUpdate(prevProps) {
        const board = this.context.renderedBoard;
        if (prevProps.board !== board) {
            console.log('task order', board.boardcolumns)
            if (board) {
                if (board.boardcolumns) {
                    var newListOrder = [];
                    for (var key in board.boardcolumns.sort((a, b) => parseFloat(a.order) - parseFloat(b.order))) {
                        newListOrder.push(board.boardcolumns[key].id);
                    }

                    this.setState({
                        lists: board.boardcolumns,
                        listOrder: newListOrder,
                    });
                    // if (board.tasks) {
                    //     this.setState({
                    //         tasks: board.tasks,
                    //     });
                    // }
                }
            }
        }
    }
    componentDidMount() {
        if (this.context.renderedBoard) {
            const board = this.context.renderedBoard;
            GetBoardColumns(board.id)
                .then((response) => {
                    if (response.responseCode === 200) {
                        var newListOrder = [];
                        for (var key in board.boardcolumns.sort((a, b) => parseFloat(a.order) - parseFloat(b.order))) {
                            newListOrder.push(board.boardcolumns[key].id);
                        }
                        GetTaskByBoardId(board.id)
                            .then((res) => {
                                if (res.responseCode === 200) {
                                    this.setState({
                                        lists: response.responseData,
                                        listOrder: newListOrder,
                                        tasks: res.responseData
                                    })
                                }
                            })
                    }
                })
        }
    }

    onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;
        const board = this.context.renderedBoard;

        // no list to drop
        if (!destination) {
            return;
        }

        // dropping to same list same place
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // triggers when reordering lists
        if (type === "list") {
            const newListOrder = Array.from(this.state.listOrder);
            newListOrder.splice(source.index, 1);
            newListOrder.splice(destination.index, 0, draggableId);

            const updatedState = {
                ...this.state,
                listOrder: newListOrder,
            };
            this.setState(updatedState);
            BoardHelpers.HandleListReordering(board, newListOrder)
                .then((renderedBoard) => {
                    this.context.setRenderedBoard(renderedBoard)
                })
                .catch((err) => console.log(err));
            return;
        }

        const home = this.state.lists[source.droppableId];
        const foreign = this.state.lists[destination.droppableId];

        // triggers when reordering tasks in the same list
        if (home === foreign) {
            console.log('hopmeee', home)
            const newTaskIds = Array.from(home.tasks.reduce((acc, cur) => {
                return [...acc, cur.id]
            }, []));
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newHome = {
                ...home,
                taskIds: newTaskIds,
            };
            const newState = {
                ...this.state,
                lists: {
                    ...this.state.lists,
                    [newHome.id]: newHome,
                },
            };
            this.setState(newState);

            BoardHelpers.HandleTaskReordering(board, newHome.id, newTaskIds)
                .then((renderedBoard) => this.context.setRenderedBoard(renderedBoard))
                .catch((err) => console.log(err));
            return;
        }

        // codes below only works when moving a task one list to another
        const homeTaskIds = Array.from(home.taskIds);
        homeTaskIds.splice(source.index, 1);
        const newHome = {
            ...home,
            taskIds: homeTaskIds,
        };

        let foreignTaskIds;
        if (foreign.taskIds) {
            foreignTaskIds = Array.from(foreign.taskIds);
        } else {
            foreignTaskIds = [];
        }
        foreignTaskIds.splice(destination.index, 0, draggableId);
        const newForeign = {
            ...foreign,
            taskIds: foreignTaskIds,
        };

        const newState = {
            ...this.state,
            lists: {
                ...this.state.lists,
                [newHome.id]: newHome,
                [newForeign.id]: newForeign,
            },
        };
        this.setState(newState);
        BoardHelpers.HandleTaskSwitching(board, newState.lists)
            .then((renderedBoard) => this.context.setRenderedBoard(renderedBoard))
            .catch((err) => console.log(err));
    };

    createNewList = async (title) => {
        let updatedState = { ...this.state };
        console.log('truoc', updatedState.lists);
        //const listId = uuidv4();
        const listId = shortid.generate();
        let list;
        const board = this.context.renderedBoard;

        // board doesn't have any list
        list = {
            id: listId,
            boardid: board.id,
            title: title,
            tasks: [],
        };

        updatedState.lists[listId] = list;

        this.setState(updatedState);
        console.log('sau', updatedState.lists);
        BoardHelpers.HandleListCreation(
            board,
            updatedState.lists,
            list,
            updatedState.listOrder
        )
            .then((renderedBoard) => {
                this.context.setRenderedBoard(renderedBoard);
            })
            .catch((err) => console.log(err));
    };

    createNewTask = (listId, title) => {
        let updatedState = { ...this.state };
        let taskCount;
        let taskId;
        let task;
        const board = this.context.renderedBoard;
        const userid = localStorage.getItem("pmt_userid");

        if (updatedState.tasks !== undefined) {
            taskCount = Object.keys(updatedState.tasks).length;
            taskId = shortid.generate();
            task = {
                id: taskId,
                title: title,
            };
            updatedState.tasks[taskId] = task;
            if (updatedState.lists[listId].taskIds)
                updatedState.lists[listId].taskIds.push(taskId);
            else updatedState.lists[listId].taskIds = [taskId];
            this.setState(updatedState);

            BoardHelpers.HandleTaskCreation(
                board,
                listId,
                updatedState.tasks,
                task,
                updatedState.lists[listId].taskIds,
                userid
            )
                .then((renderedBoard) => {
                    this.context.setRenderedBoard(renderedBoard);
                })
                .catch((err) => console.log(err));
        } else {
            taskCount = 0;
            taskId = `task-${taskCount + 1}`;
            task = {
                id: taskId,
                title: title,
            };
            updatedState.tasks = {
                [taskId]: task,
            };
            if (updatedState.lists[listId].taskIds)
                updatedState.lists[listId].taskIds.push(taskId);
            else updatedState.lists[listId].taskIds = [taskId];
            this.setState(updatedState);

            BoardHelpers.HandleTaskCreation(
                board,
                listId,
                updatedState.tasks,
                task,
                updatedState.lists[listId].taskIds,
                userid
            )
                .then((renderedBoard) => {
                    this.context.setRenderedBoard(renderedBoard);
                })
                .catch((err) => console.log(err));
        }
    };

    handleAddAnotherListButtonClick = (event) => {
        this.setState({
            ...this.state,
            anchorEl: event.currentTarget,
        });
    };

    handleNameInputClose = () => {
        this.setState({
            ...this.state,
            anchorEl: null,
        });
    };

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="all-lists" direction="horizontal" type="list">
                    {(provided) => (
                        <div
                            style={{ display: "flex" }}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {
                                this.state.listOrder &&
                                this.state.lists &&
                                this.state.listOrder.map((key, i) => {
                                    const list = this.state.lists[key];
                                    return (
                                        <ListColumn
                                            key={list.id}
                                            list={list}
                                            taskMap={this.state.tasks}
                                            index={i}
                                            createNewTask={this.createNewTask}
                                        />
                                    );
                                })}
                            {provided.placeholder}
                            <div style={{ padding: "0px 8px" }}>
                                <IconButton
                                    onClick={(e) => this.handleAddAnotherListButtonClick(e)}
                                    style={{
                                        maxHeight: "45px",
                                        width: "250px",
                                        marginTop: "8px",
                                        borderRadius: "8px",
                                        textAlign: "start",
                                        alignItems: "start",
                                        backgroundColor: "hsl(0deg 0% 100% / 80%)",
                                    }}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: "hsl(0deg 0% 100% / 90%)"
                                        },
                                    }}
                                    aria-label="add-another-list"
                                >
                                    <Grid item xs={10}>
                                        <Typography style={{
                                            fontSize: "0.875rem",
                                            fontWeight: "500"
                                        }}
                                            component="p">
                                            Add another list
                                        </Typography>
                                    </Grid>
                                    <Grid item container xs={2}>
                                        <Add />
                                    </Grid>
                                </IconButton>
                                <AddListModal
                                    anchorEl={this.state.anchorEl}
                                    handleClose={this.handleNameInputClose}
                                    createNewList={this.createNewList}
                                />
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

export default withStyles(canvasStyles)(DndCanvas);
