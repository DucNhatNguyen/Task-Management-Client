import { UIHelpers } from "helpers";

export const FetchUserData = (userid, setUserData, setOpenBackdrop) =>
  new Promise(async (resolve, reject) => {
    try {
        await fetch(`https://localhost:44385/api/v1/user/${userid}`, {
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