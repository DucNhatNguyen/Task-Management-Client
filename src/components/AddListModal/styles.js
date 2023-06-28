import { withStyles, makeStyles, createStyles } from "@mui/styles";
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
        "& label.Mui-focused": {
            color: "#2F80ED",
        },
        "& .MuiFormLabel-root": {
            fontSize: "0.875rem"
        },
        "& .MuiOutlinedInput-root": {
            fontSize: "0.875rem",
            "& fieldset": {
                border: "2px solid #2F80ED"
            },
            "&:hover fieldset": {
                borderColor: "#2F80ED",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#2F80ED",
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
        getContentAnchorEl={null}
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
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
        borderRadius: "8px",
        width: "250px",
  },
}));