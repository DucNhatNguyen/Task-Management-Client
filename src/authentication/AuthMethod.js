//import { handleSignIn, manualSignIn } from "../functions/UserFunctions";

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
            let response = await fetch("https://localhost:44385/api/v1/user/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    username: email,
                    password: password
                }),
            });
            //resolve(await response.json());
            console.log(password)
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