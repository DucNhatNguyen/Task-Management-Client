import api from 'helpers/Interceptors'

export const CreateNewList = (body) =>
    new Promise(async (resolve, reject) => {
        try {
            api.post(`${process.env.REACT_APP_ROOT_API_PATH}column`, body)
            .then(({data}) => {
                resolve(data);
            })
        } catch (err) {
            reject(err);
        }
    });
export const RenameColumn = (body) =>
    new Promise(async (resolve, reject) => {
        try {
            api.put(`${process.env.REACT_APP_ROOT_API_PATH}column/rename`, body)
            .then(({data}) => {
                resolve(data);
            })
        } catch (err) {
            reject(err);
        }
    });
export const DeleteColumn = (body) =>
    new Promise(async (resolve, reject) => {
        try {
            api.delete(`${process.env.REACT_APP_ROOT_API_PATH}column`, body)
            .then(({data}) => {
                resolve(data);
            })
        } catch (err) {
            reject(err);
        }
    });