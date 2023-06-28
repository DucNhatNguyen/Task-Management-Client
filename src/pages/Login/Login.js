import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout, AuthTheme } from "layouts";
import { AuthForm, Alert } from "components";
import { Container, CssBaseline, Snackbar } from "@mui/material";
import { loginStyles } from "./styles";
import { Authentication } from "provider/AuthProvider";

const Login = () => {
    const classes = loginStyles(AuthTheme);
    const navigate = useNavigate();
    const {
        handleLogin,
        setInputs,
        errors,
        token,
    } = useContext(Authentication);

    const [alertOpen, setAlertOpen] = useState(false);
    const [alert, setAlert] = useState("");
    const constants = {
        title: "Login",
        buttonText: "LOGIN",
        info: "Don't have an account yet? ",
        linkText: "Sign up",
        link: "/signup",
    };

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            navigate("/boards");
        }
    }, [token]);

    useEffect(() => {
        if (errors.length > 0) {
            setAlertOpen(true);
            setAlert(errors[errors.length - 1]);
        }
    }, [errors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setAlertOpen(false);
    };

    return (
        <AuthLayout>
            <div className={classes.root}>
                <Container className={classes.container} component="main" maxWidth="xs">
                    <CssBaseline />
                    <AuthForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        constants={constants}
                    />
                </Container>
            </div>
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {alert}
                </Alert>
            </Snackbar>
        </AuthLayout>
    );
};

export default Login;
