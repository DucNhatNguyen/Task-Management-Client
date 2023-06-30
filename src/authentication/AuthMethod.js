//import { handleSignIn, manualSignIn } from "../functions/UserFunctions";

import { UIHelpers } from "helpers";

const SignUp = (
    email,
    password,
    setErrors,
    setToken,
    setUserData,
    setOpenBackdrop
) => {

}

const Login = (
    email,
    password,
    setErrors,
    setToken,
    setUserData,
    setOpenBackdrop
) => {
    new Promise(async (resolve, reject) => {
        try {
            await fetch("https://localhost:44385/api/v1/user/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    username: email,
                    password: password
                })
            })
            .then(res => res.json())
            .then(async data => {
                const token = data.responseData.token;
                localStorage.setItem("pmt_token", token);
                localStorage.setItem("pmt_userid", data.responseData.user.id);
                setToken(token);
                setUserData(data.responseData);
                UIHelpers.HandleBackdropClose(setOpenBackdrop)

                resolve(data.responseData)
            })
        } catch (err) {
            reject(err);
        }
    });

};

const Logout = (setErrors, setToken) => {

};

export const AuthMethods = {
    signup: SignUp,
    login: Login,
    logout: Logout,
};