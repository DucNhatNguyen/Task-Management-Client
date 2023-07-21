import { UIHelpers } from "helpers";
import api from 'helpers/Interceptors'

export const FetchUserData = (userid, setUserData, setOpenBackdrop) => 
    new Promise(async (resolve, reject) => {
        try {
            api.get(`${process.env.REACT_APP_ROOT_API_PATH}user/${userid}`)
            .then((res) => {
                var data = res.data;
                if (setUserData){
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


export const GetUserAll = () =>
    new Promise(async (resolve, reject) => {
        try {
            api.get(`${process.env.REACT_APP_ROOT_API_PATH}user/all`)
            .then((res) => {
                resolve(res);
            })
        } catch (err) {
            reject(err);
        }
    });