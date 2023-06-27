import { createStyles, makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
import { Container } from "@mui/material";

export const useContainerStyles = () => {
    const styledContainer = styled(Container)(({ theme }) => ({
        borderRadius: "24px",
        border: "1px solid #BDBDBD",
        [theme.breakpoints.down("sm")]: {
            border: "none",
        },
    }));

    return { styledContainer };
};

export const loginStyles = makeStyles((theme) => createStyles({
    root: {
        margin: "auto",
        marginTop: "125px",
        // [theme.breakpoints.down("sm")]: {
        //     marginTop: "50px",
        // },
    },
    container: {
        borderRadius: "24px",
        border: "1px solid #BDBDBD",
        // [theme.breakpoints.down("sm")]: {
        //     border: "none",
        // },
    },
}));
