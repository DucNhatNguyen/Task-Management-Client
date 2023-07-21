import api from 'helpers/Interceptors'

export const CreateNewTask = (boardData) =>
    new Promise(async (resolve, reject) => {
        try {
            api.post(`${process.env.REACT_APP_ROOT_API_PATH}task`, boardData)
            .then(({data}) => {
                resolve(data);
            })
        } catch (err) {
            reject(err);
        }
    });
export const GetTaskByColumnId = (columnId) =>
    new Promise(async (resolve, reject) => {
        try {
            api.get(`${process.env.REACT_APP_ROOT_API_PATH}task/${columnId}`)
            .then(({data}) => {
                resolve(data);
            })
        } catch (err) {
            reject(err);
        }
    });
export const ReorderTaskList = (body) =>
    new Promise(async (resolve, reject) => {
        try {
            api.post(`${process.env.REACT_APP_ROOT_API_PATH}task/order`, body)
            .then(({data}) => {
                resolve(data);
            })
        } catch (err) {
            reject(err);
        }
    });
export const GetTaskByBoardId = (boardId) =>
    new Promise(async (resolve, reject) => {
        try {
            api.get(`${process.env.REACT_APP_ROOT_API_PATH}task/board/${boardId}`)
                .then(({data}) => {
                    resolve(data);
                })
        } catch (err) {
            reject(err);
        }
    });
export const SwitchTasks = (body) =>
    new Promise(async (resolve, reject) => {
        try {
            api.put(`${process.env.REACT_APP_ROOT_API_PATH}task/task-switch`, body)
            .then(({data}) => {
                resolve(data);
            })
        } catch (err) {
            reject(err);
        }
    });
export const ActionLabel = (body) =>
    new Promise(async (resolve, reject) => {
        try {
            api.post(`${process.env.REACT_APP_ROOT_API_PATH}task/action-label`, body)
            .then(({data}) => {
                resolve(data);
            })
        } catch (err) {
            reject(err);
        }
    });
export const EditTask = (body) =>
    new Promise(async (resolve, reject) => {
        try {
            api.put(`${process.env.REACT_APP_ROOT_API_PATH}task`, body)
            .then(({data}) => {
                resolve(data);
            })
        } catch (err) {
            reject(err);
        }
    });
export const Attachments = (formData, taskid) =>
    new Promise(async (resolve, reject) => {
        try {
            api.post(`${process.env.REACT_APP_ROOT_API_PATH}task/${taskid}/attachments`, formData, 
            {
                headers: {
                "Content-type": "multipart/form-data"
            }})
            .then(({data}) => {
                resolve(data);
            })
        } catch (err) {
            reject(err);
        }
    });
export const RemoveAttachments = (fileid) =>
    new Promise(async (resolve, reject) => {
        try {
            api.delete(`${process.env.REACT_APP_ROOT_API_PATH}task/attachments/${fileid}`)
            .then(({data}) => {
                resolve(data);
            })
        } catch (err) {
            reject(err);
        }
    });
export const AddComment = (body, taskid) =>
    new Promise(async (resolve, reject) => {
        try {
            api.post(`${process.env.REACT_APP_ROOT_API_PATH}task/${taskid}/add-comment`, body)
            .then(({data}) => {
                resolve(data);
            })
        } catch (err) {
            reject(err);
        }
    });