import { withStyles, makeStyles } from "@mui/styles";
import { Menu, TextField } from "@mui/material";
import { styled } from "@mui/material/styles"

export const modalStyles = makeStyles((theme) => ({
    addList: {
        fontSize: "0.825rem",
        padding: "6px 12px",
    },
    cancelButton: {
        padding: "8px",
    },
}));

export const NameInput = withStyles({
    root: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "8px",
        "& label.Mui-focused": {
            color: "#2F80ED",
        },
        "& .MuiFormLabel-root": {
            fontSize: "0.875rem"
        },
        "& .MuiOutlinedInput-root": {
            fontSize: "0.875rem",
            "& fieldset": {
                border: "1px solid rgb(0 0 0 / 14%)",
                borderRadius: "4px",
                //border: "2px solid #2F80ED"
            },
            "&:hover fieldset": {
                border: "1px solid rgb(0 0 0 / 20%)",
            },
            "&.Mui-focused fieldset": {
                border: "1px solid rgb(0 0 0 / 20%)",
            },
        },
        "& .MuiFormHelperText-contained": {
            color: "red",
            marginLeft: "3px"
        }
    },
    input: {
        fontSize: "0.875rem"
    }
})(TextField);


export const PopMenu = styled((props) => (
  <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "top",
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
        borderRadius: "8px",
        borderTop: "none",
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        width: "280px",
        backgroundColor: "#f5f5f5"
  },
}));