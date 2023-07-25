import api from 'helpers/Interceptors'

export const CreateNewBoard = (boardData) =>
  new Promise(async (resolve, reject) => {
    try {
      api.post(process.env.REACT_APP_ROOT_API_PATH + 'boards', boardData)
      .then(({data}) => {
        resolve(data);
      })
    } catch (err) {
      reject(err);
    }
  });

export const GetUserRelatedBoards = (userid) =>
  new Promise(async (resolve, reject) => {
    try {
      api.get(`${process.env.REACT_APP_ROOT_API_PATH}user/${userid}/boards`)
            .then(({data}) => {
                resolve(data);
            })
    } catch (err) {
      reject(err);
    }
  });

export const GetBoardAdmin = (boardId) =>
  new Promise(async (resolve, reject) => {
    try {
      api.get(`${process.env.REACT_APP_ROOT_API_PATH}boards/${boardId}/admin`)
            .then(({data}) => {
                resolve(data);
            })
    } catch (err) {
      reject(err);
    }
  });

export const GetBoardColumnsDict = (boardid) =>
new Promise(async (resolve, reject) => {
    try {
      api.get(`${process.env.REACT_APP_ROOT_API_PATH}column/list-dict?boardid=${boardid}`)
            .then(({data}) => {
                resolve(data);
            })
    } catch (err) {
      reject(err);
    }
  });

export const ReorderColumnLists = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      api.put(`${process.env.REACT_APP_ROOT_API_PATH}column/order`, body)
            .then(({data}) => {
                resolve(data);
            })
    } catch (err) {
      reject(err);
    }
  });
export const GetBoardColumns = (boardid) =>
new Promise(async (resolve, reject) => {
    try {
      api.get(`${process.env.REACT_APP_ROOT_API_PATH}column/list?boardid=${boardid}`)
            .then(({data}) => {
                resolve(data);
            })
    } catch (err) {
      reject(err);
    }
  });
export const ChangeVisibilityBoard = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      api.post(process.env.REACT_APP_ROOT_API_PATH + `boards/change-visibility`, body)
            .then(({data}) => {
                resolve(data);
            })
    } catch (err) {
      reject(err);
    }
  });

export const GetCreatedByInfo = (userid) =>
new Promise(async (resolve, reject) => {
    try {
      api.get(`${process.env.REACT_APP_ROOT_API_PATH}boards/created-by-info?userid=${userid}`)
            .then(({data}) => {
                resolve(data);
            })
    } catch (err) {
      reject(err);
    }
  });

export const UpdateBoardProperty = (body) =>
    new Promise(async (resolve, reject) => {
        try {
            api.put(`${process.env.REACT_APP_ROOT_API_PATH}boards`, body)
            .then(({data}) => {
                resolve(data);
            })
        } catch (err) {
            reject(err);
        }
    });