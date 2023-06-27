import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { FirebaseAuth } from "provider/AuthProvider";
import { AuthLayout, AuthTheme } from "layouts";
import { AuthForm, Alert } from "components";
import { loginStyles, useContainerStyles } from "./styles";
import { Container, CssBaseline, Snackbar } from "@mui/material";

const SignUp = () => {
    const classes = loginStyles(AuthTheme);
    const navigate = useNavigate();
    // const {
    //     handleSignUp,
    //     setInputs,
    //     errors,
    //     token,
    // } = useContext(FirebaseAuth);

    const [alertOpen, setAlertOpen] = useState(false);
    const [alert, setAlert] = useState("");
    const token = null;
    const constants = {
        title: "Sign Up",
        buttonText: "CREATE YOUR ACCOUNT",
        info: "Already a member? ",
        linkText: "Login",
        link: "/login",
    };

    const { styledContainer: StyledContainer } = useContainerStyles();



    useEffect(() => {
        if (token) {
            navigate("/boards");
        }
    }, [token]);

    // useEffect(() => {
    //     if (errors.length > 0) {
    //         setAlertOpen(true);
    //         setAlert(errors[errors.length - 1]);
    //     }
    // }, [errors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // handleSignUp()
        //     .then(() => history.push("/login"))
        //     .catch((err) => console.log(err));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        //setInputs((prev) => ({ ...prev, [name]: value }));
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
                <StyledContainer component="main" maxWidth="xs">
                    <CssBaseline />
                    <AuthForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        constants={constants}
                    />
                </StyledContainer>
            </div>
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {alert}
                </Alert>
            </Snackbar>
        </AuthLayout>
    );
};

export default SignUp;
