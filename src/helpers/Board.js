import { CreateNewTask, ReorderTaskList, SwitchTasks } from "api/Task";
import { CreateNewList } from "api/List";
import { GetBoardColumns, ReorderColumnLists } from "api/Board"
import { GetUserRelatedBoards } from "api/Board";
import { UIHelpers, UserHelpers } from "helpers/";

const ParseBoardId = (
    boards // structuring boardIds for api call --> ["id1", "id2"]
) =>
    new Promise((resolve, reject) => {
        let body = [];
        try {
            for (let i = 0; i < boards.length; i++) {
                if (boards[i].boardId !== undefined) {
                    body.push(boards[i].boardId);
                }
                if (i === boards.length - 1) {
                    resolve(body);
                }
            }
        } catch (err) {
            reject(err);
        }
    });

const HandleUserRelatedBoards = (
    // fetching user related boards and seting them to context
    userData,
    setBoards,
    setOpenBackdrop
) =>
    new Promise((resolve, reject) => {
        if (!userData) {
            UIHelpers.HandleBackdropOpen(setOpenBackdrop);
        }
        if (
            userData !== undefined &&
            userData.boards !== undefined &&
            Object.keys(userData.boards).length > 0
        ) {
            UIHelpers.HandleBackdropOpen(setOpenBackdrop);
            GetUserRelatedBoards(userData.id)
                .then((response) => {
                    if (response.responseCode === 200) {
                        setBoards(response.responseData);
                        UIHelpers.HandleBackdropClose(setOpenBackdrop);
                        resolve(true);
                    }
                })
                .catch((err) => {
                    UIHelpers.HandleBackdropClose(setOpenBackdrop);
                    reject(err);
                });
        } else {
            if (userData !== undefined) {
                UIHelpers.HandleBackdropClose(setOpenBackdrop);
            }
            reject("userData or boards are undefined");
        }
    });

const FindExactBoard = (
    slug,
    boards,
    setRenderedBoard,
    setShowAllBoards,
    setOpenBackdrop,
    setAdmin,
    userData
) => {
    UIHelpers.HandleBackdropOpen(setOpenBackdrop);

    for (let board of boards) {
        if (board.slug === slug) {
            UIHelpers.HandleBoardPageRender(
                board,
                setRenderedBoard,
                setShowAllBoards
            );
            UIHelpers.HandleBackdropClose(setOpenBackdrop);

            if (board.createdby === localStorage.getItem("pmt_userid")) {
                setAdmin(true)
            }
            break;
        }
    }
};

const HandleBoardCreation = (
    response,
    userData,
    setUserData,
    setBoards,
    setOpenBackdrop
) =>
    new Promise(async (resolve, reject) => {
        try {
            let updateUser = { ...userData };
            if (updateUser.boards !== undefined && updateUser.boards !== null) {
                Object.assign(updateUser.boards, response);
                setUserData(updateUser);
                const data = await UserHelpers.HandleUserData(
                    userData.id,
                    setUserData,
                    setBoards,
                    setOpenBackdrop
                );
                resolve(data);
            } else {
                updateUser.boards = response;
                setUserData(updateUser);
                const data = await UserHelpers.HandleUserData(
                    userData.id,
                    setUserData,
                    setBoards,
                    setOpenBackdrop
                );
                resolve(data);
            }
        } catch (err) {
            reject(err);
        }
    });

const HandleInvitingUser = (boardId, input) =>
    new Promise((resolve, reject) => {
        // InviteUser({ boardId: boardId, address: input })
        //     .then((response) => {
        //         resolve(response);
        //     })
        //     .catch((err) => {
        //         reject(err);
        //     });
    });

const HandleListCreation = (board, lists, list, listOrder) =>
    new Promise((resolve, reject) => {
        if ((board && lists, list)) {
            board.lists = lists;
            //board.listOrder = listOrder;
            CreateNewList({
                id: list.id,
                boardid: board.id,
                title: list.title,
                //listOrder: listOrder,
            });
            resolve(board);
        } else {
            reject("Boards or boardId is empty!");
        }
    });

const HandleTaskCreation = (board, listId, tasks, task, taskIds, userid) =>
    new Promise((resolve, reject) => {
        if (board && listId && tasks && tasks && task && taskIds) {
            board.tasks = tasks;
            CreateNewTask({
                id: task.id,
                title: task.title,
                columnId: listId,
                createdBy: userid,
            });
            resolve(board);
        } else {
            reject("Missing parameter empty!");
        }
    });

const HandleListReordering = (board, listOrder) =>
    new Promise((resolve, reject) => {
        if (board && listOrder) {
            ReorderColumnLists({
                boardId: board.id,
                listOrder: listOrder,
            })
                .then((response) => {
                    if (response.responseCode === 200) {
                        board.boardcolumns = response.responseData;
                        resolve(true);
                    }
                })

            resolve(board);
        } else {
            reject("Missing parameters");
        }
    });

const HandleTaskReordering = (board, listId, taskIds) =>
    new Promise((resolve, reject) => {
        if (board && listId && taskIds) {
            ReorderTaskList({
                columnId: listId,
                listTasksOrder: taskIds
            }).then((response) => {
                if (response.responseCode === 200) {
                    GetBoardColumns(board.id).then((res) => {
                        board.boardcolumns = res.responseData;
                        resolve(true);
                    })
                }
            })
            // ReorderTasks({
            //     boardId: board.id,
            //     listId: listId,
            //     taskIds: taskIds,
            // });
            resolve(board);
        } else {
            reject("Missing parameters");
        }
    });

const HandleTaskSwitching = (board, lists, source, target, draggableId) =>
    new Promise((resolve, reject) => {
        if (board && lists) {
            board.lists = lists;
            let listParam = []
            for (let value of Object.values(lists)) {
                listParam.push(value);
            }
            SwitchTasks({
                boardId: board.id,
                lists: listParam,
                source: source,
                target: target,
                draggableId: draggableId
            });
            resolve(board);
        } else {
            reject("Missing parameters");
        }
    });

const HandleBoardPropertyUpdate = (boardId, property, data) =>
    new Promise((resolve, reject) => {
        if (boardId && property && data) {
            // UpdateBoardProperty({
            //     boardId: boardId,
            //     property: property,
            //     data: data || " ",
            // })
            //     .then(() => resolve(true))
            //     .catch((err) => reject(err));
        } else {
            reject("Missing parameters");
        }
    });

const HandleRemovingUser = (boardId, userId) =>
    new Promise((resolve, reject) => {
        // RemoveUser({ boardId: boardId, userId: userId })
        //     .then((response) => {
        //         resolve(response);
        //     })
        //     .catch((err) => {
        //         reject(err);
        //     });
    });

const BoardHelpers = {
    HandleUserRelatedBoards: HandleUserRelatedBoards,
    HandleBoardCreation: HandleBoardCreation,
    HandleBoardPropertyUpdate: HandleBoardPropertyUpdate,
    HandleListCreation: HandleListCreation,
    HandleTaskCreation: HandleTaskCreation,
    HandleListReordering: HandleListReordering,
    HandleTaskReordering: HandleTaskReordering,
    HandleTaskSwitching: HandleTaskSwitching,
    HandleInvitingUser: HandleInvitingUser,
    HandleRemovingUser: HandleRemovingUser,
    FindExactBoard: FindExactBoard,
};

export default BoardHelpers;
