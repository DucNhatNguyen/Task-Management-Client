export const CreateNewList = (body) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await fetch(`${process.env.REACT_APP_ROOT_API_PATH}column`, {
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

export const RenameColumn = (body) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await fetch(`${process.env.REACT_APP_ROOT_API_PATH}column/rename`, {
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

export const DeleteColumn = (body) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await fetch(`${process.env.REACT_APP_ROOT_API_PATH}column`, {
                method: "DELETE",
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