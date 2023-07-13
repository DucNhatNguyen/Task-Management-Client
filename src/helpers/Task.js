// import { UpdateTaskProperty } from "api/Task";

import { EditTask } from "api/Task";

const HandleTaskPropertyUpdate = (board, taskId, property, data) =>
    new Promise((resolve, reject) => {
        if (board && taskId && property && data) {
            console.log('edit task', {
                board: board,
                taskId: taskId,
                property: property,
                data: data
            })
            board.tasks[taskId][property] = data;
            EditTask({
                boardId: board.id,
                taskId: taskId,
                property: property,
                data: data || " ",
            })
            .then(() => resolve(board))
            .catch((err) => reject(err));
            // UpdateTaskProperty({
            //     boardId: board.id,
            //     taskId: taskId,
            //     property: property,
            //     data: data || " ",
            // })
            //     .then(() => resolve(board))
            //     .catch((err) => reject(err));
        } else {
            console.log('edit task', {
                board: board,
                taskId: taskId,
                property: property,
                data: data
            })
            reject("Missing parameters");
        }
    });


const TaskHelpers = {
    HandleTaskPropertyUpdate: HandleTaskPropertyUpdate,
};

export default TaskHelpers;
