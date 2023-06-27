import { Box, Container, Grid } from "@mui/material";
import {
    createStyles,
    styled,
} from "@mui/material/styles";
import { withStyles, makeStyles } from "@mui/styles";

export const useContainerStyles = () => {
    const styledContainer = styled(Container)(({ theme }) => ({
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(4),
        // [theme.breakpoints.down("sm")]: {
        //     marginTop: theme.spacing(4),
        // },
        // [theme.breakpoints.down("xs")]: {
        //     marginTop: theme.spacing(4),
        // }
    }));

    return { styledContainer };
};

export const useBoxStyles = () => {
    const styledBox = styled(Box)(({ theme }) => ({
        // [theme.breakpoints.down("md")]: {
        //     marginBottom: theme.spacing(3),
        // },
    }));

    return { styledBox };
};

export const useBoardsContainer = () => {
    const styledBoardsContainer = styled(Grid)(({ theme }) => ({
        // [theme.breakpoints.down("xs")]: {
        //     justifyContent: "center",
        //     marginBottom: theme.spacing(3),
        // }
    }));

    return { styledBoardsContainer };
};

export const boardsStyles = makeStyles((theme) => createStyles({
    root: {
        flexGrow: 1,
    },
    boxContainer: {
        // [theme.breakpoints.down("md")]: {
        //     marginBottom: theme.spacing(3),
        // },
    },
    container: {
        marginTop: "64px",
        marginBottom: "32px",
        // [theme.breakpoints.down("sm")]: {
        //     marginTop: theme.spacing(4),
        // },
        // [theme.breakpoints.down("xs")]: {
        //     marginTop: theme.spacing(4),
        // }
    },
    boardsContainer: {
        // [theme.breakpoints.down("xs")]: {
        //     justifyContent: "center",
        //     marginBottom: theme.spacing(3),
        // }
    },
    button: {
        backgroundColor: "#2F80ED",
        borderRadius: "8px",
        padding: "6px 13px",
    },
    title: {
        letterSpacing: "-0.035em",
        color: "#333333",
    },
}));
