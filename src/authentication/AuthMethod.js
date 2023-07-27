import { handleSignIn } from "functions/UserFunction";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            await fetch(`${process.env.REACT_APP_ROOT_API_PATH}user/login`, {
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
                handleSignIn(data.responseData.user, setUserData, setOpenBackdrop)
                
                toast.success('Đăng nhập thành công', {
                    position: toast.POSITION.TOP_RIGHT
                });

                await localStorage.setItem("pmt_token", token);
                await localStorage.setItem("pmt_userid", data.responseData.user.id);
                await setToken(token);
                
                resolve(data.responseData)
            })
        } catch (err) {
            reject(err);
        }
    });

};

const Logout = (setErrors, setToken) => {
    toast.success('Đăng xuất thành công', {
              position: toast.POSITION.TOP_RIGHT
          });
    localStorage.removeItem("pmt_token");
    localStorage.removeItem("pmt_userid");
    setToken(null);
};

export const AuthMethods = {
    signup: SignUp,
    login: Login,
    logout: Logout,
};