export const CreateNewTask = (boardData) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await fetch('https://localhost:44385/api/v1/task', {
                method: "POST",
                headers: new Headers({
                    "Content-type": "application/json; charset=UTF-8",
                }),
                body: JSON.stringify(boardData),
            });
            resolve(await response.json());
        } catch (err) {
            reject(err);
        }
    });

export const GetTaskByColumnId = (columnId) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await fetch(`https://localhost:44385/api/v1/task/${columnId}`, {
                method: "GET",
                headers: new Headers({
                    "Content-type": "application/json; charset=UTF-8",
                })
            });
            resolve(await response.json());
        } catch (err) {
            reject(err);
        }
    });



export const ReorderTaskList = (body) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await fetch('https://localhost:44385/api/v1/task/order', {
                method: "PUT",
                headers: new Headers({
                    "Content-type": "application/json; charset=UTF-8",
                }),
                body: JSON.stringify(body),
            });
            resolve(await response.json());
        } catch (err) {
            reject(err);
        }
    });

export const GetTaskByBoardId = (boardId) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await fetch(`https://localhost:44385/api/v1/task/board/${boardId}`, {
                method: "GET",
                headers: new Headers({
                    "Content-type": "application/json; charset=UTF-8",
                })
            });
            resolve(await response.json());
        } catch (err) {
            reject(err);
        }
    });