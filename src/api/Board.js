export const CreateNewBoard = (boardData) =>
  new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(process.env.REACT_APP_ROOT_API_PATH + `boards`, {
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

export const GetUserRelatedBoards = (userid) =>
  new Promise(async (resolve, reject) => {
    try {
      await fetch(`${process.env.REACT_APP_ROOT_API_PATH}user/${userid}/boards`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      })
        .then(res => res.json())
        .then(async data => {
          resolve(data)
        })
    } catch (err) {
      reject(err);
    }
  });

export const GetBoardAdmin = (boardId) =>
  new Promise(async (resolve, reject) => {
    try {
      await fetch(`${process.env.REACT_APP_ROOT_API_PATH}boards/${boardId}/admin`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      })
        .then(res => res.json())
        .then(async data => {
          resolve(data)
        })
    } catch (err) {
      reject(err);
    }
  });

export const GetBoardColumnsDict = (boardid) =>
new Promise(async (resolve, reject) => {
    try {
      await fetch(`${process.env.REACT_APP_ROOT_API_PATH}column/list-dict?boardid=${boardid}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      })
        .then(res => res.json())
        .then(async data => {
          resolve(data)
        })
    } catch (err) {
      reject(err);
    }
  });

export const ReorderColumnLists = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_ROOT_API_PATH}column/order`, {
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

export const GetBoardColumns = (boardid) =>
new Promise(async (resolve, reject) => {
    try {
      await fetch(`${process.env.REACT_APP_ROOT_API_PATH}column/list?boardid=${boardid}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      })
        .then(res => res.json())
        .then(async data => {
          resolve(data)
        })
    } catch (err) {
      reject(err);
    }
  });