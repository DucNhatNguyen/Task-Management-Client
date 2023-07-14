import { UIHelpers } from "helpers";

export const FetchUserData = (userid, setUserData, setOpenBackdrop) =>
  new Promise(async (resolve, reject) => {
    try {
        let response = await fetch(`${process.env.REACT_APP_ROOT_API_PATH}user/${userid}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                }
            });

        const data = await response.json();
        if (setUserData){
          setUserData(data.responseData);
          UIHelpers.HandleBackdropClose(setOpenBackdrop);
          resolve(data.responseData);
        }
        return data.responseData;

    } catch (err) {
      console.log(err);
      reject(err);
    }
  });

export const GetUserAll = () =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await fetch(`${process.env.REACT_APP_ROOT_API_PATH}user/all`, {
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