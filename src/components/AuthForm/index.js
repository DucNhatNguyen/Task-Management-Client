import React from "react";
import { Link } from "react-router-dom";
import {
    Typography,
    Grid,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { LockOutlined, Mail, Lock, Twitter, GitHub, Google } from "@mui/icons-material";
import { AuthTheme } from "layouts";
import {
    formStyles,
    LoginTextField,
    useAvatarStyles,
    useSubmitStyles,
    useGridContainerStyles
} from "./styles";

const AuthForm = ({
    handleSubmit,
    handleChange,
    constants,
}) => {
    const classes = formStyles(AuthTheme);
    const { styledAvatar: StyledAvatar } = useAvatarStyles();
    const { styledSubmit: StyledSubmit } = useSubmitStyles();
    const { styledGridContainer: StyledGridContainer } = useGridContainerStyles();
    return (
        <div className={classes.paper}>
            <StyledAvatar>
                <LockOutlined />
            </StyledAvatar>
            <Typography style={{ color: "#E0E0E0" }} component="h1" variant="h5">
                {constants.title}
            </Typography>
            <form onSubmit={handleSubmit} className={classes.form}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <LoginTextField
                            onChange={handleChange}
                            variant="outlined"
                            type="dark"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="off"
                            InputProps={{
                                style: {
                                    color: "#828282",
                                    backgroundColor: "#252329",
                                },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Mail style={{ color: "#828282" }} />
                                    </InputAdornment>
                                ),
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "#828282",
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <LoginTextField
                            onChange={handleChange}
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="off"
                            className={classes.TextField}
                            InputProps={{
                                style: {
                                    color: "#828282",
                                    backgroundColor: "#252329",
                                },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock style={{ color: "#828282" }} />
                                    </InputAdornment>
                                ),
                            }}
                            InputLabelProps={{
                                style: {
                                    color: "#828282",
                                }
                            }}
                        />
                    </Grid>
                </Grid>
                <StyledSubmit
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    {constants.buttonText}
                </StyledSubmit>
                {/* <StyledGridContainer container justifyContent={"center"}>
                    <Grid item>
                        <Typography style={{ color: "#828282" }} variant="body2">
                            or continue with these
                        </Typography>
                    </Grid>
                </StyledGridContainer>
                <StyledGridContainer
                    container
                    spacing={3}
                    justifyContent={"center"}
                >
                    <Grid item xs={3}>
                        <IconButton
                            aria-label="upload picture"
                            component="span"
                            style={{
                                borderRadius: "100%",
                                border: "1px solid #828282",
                                color: "#828282"
                            }}
                        //onClick={() => handleGoogleLogin()}
                        >
                            <Google style={{ color: "#828282" }} />
                        </IconButton>
                    </Grid>
                    <Grid item xs={3}>
                        <IconButton
                            aria-label="upload picture"
                            component="span"
                            style={{
                                borderRadius: "100%",
                                border: "1px solid #828282",
                                color: "#828282"
                            }}
                        //onClick={() => handleTwitterLogin()}
                        >
                            <Twitter />
                        </IconButton>
                    </Grid>
                    <Grid item xs={3}>
                        <IconButton
                            aria-label="upload picture"
                            component="span"
                            style={{
                                borderRadius: "100%",
                                border: "1px solid #828282",
                                color: "#828282"
                            }}
                        //onClick={() => handleGithubLogin()}
                        >
                            <GitHub />
                        </IconButton>
                    </Grid>
                </StyledGridContainer> */}
                <StyledGridContainer container justifyContent={"flex-end"}>
                    <Grid item>
                        <Typography style={{ color: "#828282" }} variant="body2">
                            {constants.info}
                            <Link
                                style={{ color: "#2F80ED" }}
                                to={constants.link}
                                variant="body2"
                            >
                                {constants.linkText}
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            variant="body2"
                            style={{ marginTop: "24px", textAlign: "end", color: "#828282" }}
                        >
                            email : test@gmail.com
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            variant="body2"
                            style={{ marginTop: "8px", textAlign: "end", color: "#828282" }}
                        >
                            password : Trellotest.
                        </Typography>
                    </Grid>
                </StyledGridContainer>
            </form>
        </div>
    );
};

export default AuthForm;
