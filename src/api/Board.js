export const CreateNewBoard = (boardData) =>
  new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(process.env.REACT_APP_SERVICE_URL + `/board`, {
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
      await fetch(`https://localhost:44385/api/v1/user/${userid}/boards`, {
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
      await fetch(`https://localhost:44385/api/v1/boards/${boardId}/admin`, {
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
      await fetch(`https://localhost:44385/api/v1/column/list-dict?boardid=${boardid}`, {
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
      let response = await fetch('https://localhost:44385/api/v1/column/order', {
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
      await fetch(`https://localhost:44385/api/v1/column/list?boardid=${boardid}`, {
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