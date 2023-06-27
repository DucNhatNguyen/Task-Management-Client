import { makeStyles, withStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
import { Avatar, Button, Grid, TextField } from "@mui/material";

export const useAvatarStyles = () => {
    const styledAvatar = styled(Avatar)(({ theme }) => ({
        margin: theme.spacing(1),
        backgroundColor: "#f50057",
        color: "#E0E0E0"
    }));

    return { styledAvatar };
};

export const useSubmitStyles = () => {
    const styledSubmit = styled(Button)(({ theme }) => ({
        margin: theme.spacing(3, 0, 2)
    }));

    return { styledSubmit };
};

export const useGridContainerStyles = () => {
    const styledGridContainer = styled(Grid)(({ theme }) => ({
        marginTop: "15px",
        marginBottom: "15px"
    }));

    return { styledGridContainer };
};

export const formStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(8, 5, 6, 5),
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(8, 2, 8, 2),
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: "24px",
        fontSize: "1rem"
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    signUpText: {
        color: "#E0E0E0",
    },
    link: {
        color: "#2F80ED"
    },
    infoText: {
        color: "#828282"
    },
    iconButton: {
        borderRadius: "100%",
        border: "1px solid #828282",
        color: "#828282"
    },
    gridContainer: {
        marginTop: "15px",
        marginBottom: "15px"
    }
}));

export const LoginTextField = withStyles((theme) => ({
    root: {
        "& label.Mui-focused": {
            color: theme.palette.info.main,
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: theme.palette.primary.main,
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: theme.palette.info.main,
            },
            "&:hover fieldset": {
                borderColor: theme.palette.info.main,
            },
            "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.main,
            },
        },
    },
}))(TextField);
