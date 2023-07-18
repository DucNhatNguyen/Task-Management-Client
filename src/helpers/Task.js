// import { UpdateTaskProperty } from "api/Task";

import { EditTask } from "api/Task";

const HandleTaskPropertyUpdate = (board, taskId, property, data) =>
    new Promise((resolve, reject) => {
        if (board && taskId && property && data) {
            board.tasks[taskId][property] = data;
            EditTask({
                boardId: board.id,
                taskId: taskId,
                property: property,
                data: data || " ",
            })
                .then(() => resolve(board))
                .catch((err) => reject(err));
        } else {
            reject("Missing parameters");
        }
    });

const HandleTimeComment = (datetime) => {
    const now = new Date(datetime);
    const day = now.getDate();
    const month = now.toLocaleString("en-EN", { month: "long" });
    const time = now.toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    return day + " " + month + " at " + now.toLocaleTimeString("vi-VN")
}

const TaskHelpers = {
    HandleTaskPropertyUpdate: HandleTaskPropertyUpdate,
    HandleTimeComment: HandleTimeComment
};

export default TaskHelpers;
