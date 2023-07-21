import React, { useState, useEffect } from "react";
import { AuthMethods } from "authentication/AuthMethod";
import InjectAxiosInterceptors from "helpers/InjectAxiosInterceptors";

export const Authentication = React.createContext();

const AuthProvider = ({
    setOpenBackdrop,
    setUserData,
    setBoards,
    children,
}) => {
    const [inputs, setInputs] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("pmt_token"));

    useEffect(() => {
        //InjectAxiosInterceptors(setToken)
        if (!token) {
            setOpenBackdrop(false);
        }
    }, [token]);

    const handleSignUp = () => {
        // middle man between firebase and signup
        // calling signup from firebase server
        return AuthMethods.signup(
            inputs.email,
            inputs.password,
            setErrors,
            setToken,
            setOpenBackdrop
        );
    };

    const handleLogin = () => {
        AuthMethods.login(
            inputs.email,
            inputs.password,
            setErrors,
            setToken,
            setUserData,
            setOpenBackdrop
        );
    };

    const handleLogout = () => {
        AuthMethods.logout(setErrors, setToken);
        setBoards([]);
        setUserData([]);
        setOpenBackdrop(false);
    };

    return (
        <Authentication.Provider
            value={{
                handleSignUp,
                handleLogin,
                handleLogout,
                inputs,
                setInputs,
                errors,
                token,
            }}
        >
            {children}
        </Authentication.Provider>
    );
};

export default AuthProvider;