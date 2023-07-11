import { UIHelpers } from "helpers";

export const FetchUserData = (userid, setUserData, setOpenBackdrop) =>
  new Promise(async (resolve, reject) => {
    try {
        await fetch(`${process.env.REACT_APP_ROOT_API_PATH}user/${userid}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                }
            })
            .then(res => res.json())
            .then(async data => {
                if (setUserData) {
                    setUserData(data.responseData);
                    UIHelpers.HandleBackdropClose(setOpenBackdrop);
                    resolve(data.responseData);
                }
            })
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });