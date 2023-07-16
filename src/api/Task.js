export const CreateNewTask = (boardData) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await fetch(`${process.env.REACT_APP_ROOT_API_PATH}task`, {
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
            let response = await fetch(`${process.env.REACT_APP_ROOT_API_PATH}task/${columnId}`, {
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
            let response = await fetch(`${process.env.REACT_APP_ROOT_API_PATH}task/order`, {
                method: "POST",
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
            let response = await fetch(`${process.env.REACT_APP_ROOT_API_PATH}task/board/${boardId}`, {
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

export const SwitchTasks = (body) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await fetch(
                `${process.env.REACT_APP_ROOT_API_PATH}task/task-switch`,
                {
                    method: "PUT",
                    headers: new Headers({
                        "Content-type": "application/json; charset=UTF-8",
                    }),
                    body: JSON.stringify(body),
                }
            );
            resolve(await response.json());
        } catch (err) {
            reject(err);
        }
    });

export const ActionLabel = (body) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await fetch(`${process.env.REACT_APP_ROOT_API_PATH}task/action-label`, {
                method: "POST",
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

export const EditTask = (body) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await fetch(`${process.env.REACT_APP_ROOT_API_PATH}task`, {
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

export const Attachments = (formData, taskid) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await fetch(`${process.env.REACT_APP_ROOT_API_PATH}task/${taskid}/attachments`, {
                method: "POST",
                body: formData,
            });
            resolve(await response.json());
        } catch (err) {
            reject(err);
        }
    });

export const RemoveAttachments = (fileid) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await fetch(`${process.env.REACT_APP_ROOT_API_PATH}task/attachments/${fileid}`, {
                method: "DELETE",
            });
            resolve(await response.json());
        } catch (err) {
            reject(err);
        }
    });

export const AddComment = (body, taskid) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await fetch(`${process.env.REACT_APP_ROOT_API_PATH}task/${taskid}/add-comment`, {
                method: "POST",
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