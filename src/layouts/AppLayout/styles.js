import {
    createStyles,
    createTheme,
    styled,
} from "@mui/material/styles";
import { withStyles, makeStyles } from "@mui/styles";
import { AppBar, Button, Menu, MenuItem, Toolbar, Typography } from "@mui/material";

export const AppTheme = createTheme({
    typography: {
        fontFamily: "Poppins !important",
    },
    palette: {
        primary: {
            main: "#2F80ED",
        },
        secondary: {
            main: "#F2F2F2",
        },
    },
    overrides: {
        MuiButton: {
            // Name of the rule
            label: {
                textTransform: "initial",
            },
        },
    },
});

export const LayoutStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
}));

//******************headerStyles*********************** */

export const appStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        boxShadow: "0px 2px 2px rgb(0 0 0 / 5%)",
    },
    children: {
        minHeight: "80vh",
        fontFamily: "Poppins",
        // [theme.breakpoints.down("sm")]: {
        //     minHeight: "85vh",
        // },
    },
    footer: {
        padding: "0 16px",
        marginTop: "auto",
    },
}));
//******************headerStyles*********************** */

export const footerStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
    },

    divider: {
        backgroundColor: "#333333",
    },
    footerText: {
        color: "#333333",
        textAlign: "start",
        fontWeight: "500",
        paddingLeft: "10px",
    },
    gridContainer: {
        marginTop: "20px",
        marginBottom: "20px",
    },
    linkGrid: {
        textAlign: "center",
    },
}));


//******************headerStyles*********************** */
export const useToolbar = () => {
    const styledToolbar = styled(Toolbar)(({ theme }) => ({
        [theme.breakpoints.down("xs")]: {
            padding: "0px",
        },
    }));

    return { styledToolbar };
};

export const useIconButton = () => {
    const styledIconButton = styled(Button)(({ theme }) => ({
        marginRight: theme.spacing(2),
        borderRadius: "0px",
        "&:hover": {
            background: "#ffffff",
        },
        [theme.breakpoints.down("xs")]: {
            display: "none",
        },
    }));

    return { styledIconButton };
};

export const useMenuTitle = () => {
    const styledMenuTitle = styled(Button)(({ theme }) => ({
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(1.5),
        color: "#333333"
    }));

    return { styledMenuTitle };
};

export const useTypography = () => {
    const styledTypography = styled(Button)(({ theme }) => ({
        textAlign: "center",
        fontSize: "1.125rem",
        lineHeight: "27px",
        fontWeight: "500",
        letterSpacing: "-0.035em",
        paddingRight: theme.spacing(3),
        borderRight: "1px solid #E0E0E0",
        maxWidth: "350px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    }));

    return { styledTypography };
};

export const useAllBoardsButton = () => {
    const styledAllBoardsButton = styled(Button)(({ theme }) => ({
        marginLeft: theme.spacing(3),
        borderRadius: "8px",
        backgroundColor: "#F2F2F2",
        paddingTop: "6px",
        paddingBottom: "6px"
    }));

    return { styledAllBoardsButton };
};

export const useAppBar = () => {
    const styledAppBar = styled(AppBar)(({ theme }) => ({
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.05)",
        color: "#333333"
    }));

    return { styledAppBar };
};

export const useTitle = () => {
    const styledTitle = styled(Typography)(({ theme }) => ({
        textAlign: "center",
        fontSize: "1.125rem",
        lineHeight: "27px",
        fontWeight: "500",
        letterSpacing: "-0.035em",
        paddingRight: theme.spacing(3),
        borderRight: "1px solid #E0E0E0",
        maxWidth: "350px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    }));

    return { styledTitle };
};

export const headerStyles = makeStyles((theme) => createStyles({
    root: {
        flexGrow: 1,
    },
    appbar: {
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.05)",
        color: "#333333",
    },
    toolbar: {
        [theme.breakpoints.down("xs")]: {
            padding: "0px",
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        borderRadius: "0px",
        "&:hover": {
            background: "#ffffff",
        },
        [theme.breakpoints.down("xs")]: {
            display: "none",
        },
    },
    menuIcon: {
        color: "#2F80ED",
        fontSize: "2rem",
    },
    menuTitle: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(1.5),
        color: "#333333",
    },
    boardsContainer: {
        justifyContent: "flex-start",
        display: "flex",
        alignItems: "center",
        flexGrow: "1",
        [theme.breakpoints.down("xs")]: {
            display: "none",
        },
    },

    title: {
        textAlign: "center",
        fontSize: "1.125rem",
        lineHeight: "27px",
        fontWeight: "500",
        letterSpacing: "-0.035em",
        paddingRight: theme.spacing(3),
        borderRight: "1px solid #E0E0E0",
        maxWidth: "350px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    allBoardsButton: {
        marginLeft: theme.spacing(3),
        borderRadius: "8px",
        backgroundColor: "#F2F2F2",
        paddingTop: "6px",
        paddingBottom: "6px",
    },
    allBoardsText: {
        color: "#828282",
        fontSize: "0.75rem",
        fontWeight: "500",
        lineHeight: "18px",
        letterSpacing: "-0.035em",
        fontFamily: "Poppins",
    },
    allBoardsIcon: {
        color: "#828282",
    },
}));
//******************headerStyles*********************** */



export const menuStyles = makeStyles((theme) => createTheme({
    menuContainer: {
        [theme.breakpoints.down("xs")]: {
            width: "100%",
        },
    },
    popButton: {
        color: "#333333",
        borderRadius: "0px",
        minWidth: "250px",
        display: "flex",
        justifyContent: "flex-end",
        "&:hover": {
            background: "#ffffff",
        },
        [theme.breakpoints.down("xs")]: {
            justifyContent: "flex-start",
        },
    },
    avatar: {
        width: theme.spacing(4.5),
        height: theme.spacing(4.5),
        borderRadius: "8px"
    },
    username: {
        marginLeft: theme.spacing(1.5),
        fontWeight: "600",
        display: "flex",
        alignItems: "center",
    },
    arrowIcon: {
        marginLeft: theme.spacing(2),
    },
    menuDivider: {
        width: "85%",
        margin: "auto",
    },
}), { index: 1 });

export const PopMenu = styled((props) => (
  <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "center",
        }}
        {...props}
        MenuListProps={{ disablePadding: true }}
    />
))(({ theme }) => ({
  '& .MuiPaper-root': {
        border: "1px solid #E0E0E0",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
        borderRadius: "12px",
        [theme.breakpoints.down('xs')]: {
            width: "250px"
        },
  },
}));

export const PopMenuItem = styled((props) => (
  <MenuItem
        {...props}
    />
))(({ theme }) => ({
  '&.MuiMenuItem-root': {
        borderRadius: "8px",
        marginLeft: theme.spacing(1.5),
        marginRight: theme.spacing(1.5),
        marginTop: theme.spacing(1.8),
        marginBottom: theme.spacing(1.8),
        "&:focus": {
            backgroundColor: "#F2F2F2",
        },
        "& .MuiListItemIcon-root": {
            minWidth: "40px",
        },
        "& .MuiTypography-body1": {
            fontWeight: "bold",
            fontSize: "0.9rem",
        },
  },
}));
