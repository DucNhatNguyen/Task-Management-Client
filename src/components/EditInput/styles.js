import { makeStyles, withStyles } from "@mui/styles";
import { TextField } from "@mui/material";
export const EditInput = withStyles({
    root: {
        width: "100%",
        "& label.Mui-focused": {
            color: "#2F80ED",
        },
        "& .MuiFormLabel-root": {
            fontSize: "0.875rem",
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
            marginLeft: "3px",
        },
    },
    input: {
        fontSize: "0.875rem",
    },
})(TextField);

