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