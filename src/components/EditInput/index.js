import React, { useState } from "react";
import { Grid, Button, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { EditInput } from "./styles";

const EditComment = ({ handleClose, editInput, value, label }) => {
    const [input, setInput] = useState(value);
    const [error, setError] = useState();

    const handleChange = (e) => {
        setInput(e.target.value);
        setError();
    };

    const handleSaveButtonClick = () => {
        setError();
        if (input.trim().length <= 0) {
            setError("Input field cannot be empty!");
        } else {
            editInput(input);
            handleClose();
        }
    };

    useState(() => {
        setInput(value);
    }, [value]);

    return (
        <Grid container>
            <Grid item xs={12}>
                <EditInput
                    onChange={handleChange}
                    value={input}
                    label={label}
                    variant="outlined"
                    margin="dense"
                    multiline
                    //maxRows={10}
                    rows={2}
                />
            </Grid>
            <Grid
                item
                xs={12}
                container
                alignItems="center"
                style={{ paddingTop: "4px" }}
            >
                <Grid item>
                    <Button
                        style={{
                            fontSize: "0.825rem",
                            padding: "6px 12px"
                        }}
                        variant="contained"
                        color="primary"
                        onClick={handleSaveButtonClick}
                    >
                        Save
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <IconButton
                        style={{ marginLeft: "16px", padding: "8px" }}
                        aria-label="cancel"
                        onClick={() => {
                            setInput(value);
                            handleClose();
                        }}
                    >
                        <Close />
                    </IconButton>
                </Grid>
            </Grid>
            {error && <Typography style={{
                fontSize: "0.825rem",
                color: "#f44336",
                marginTop: "12px",
                marginBottom: "8px"
            }}>
                {error}
            </Typography>}
        </Grid>
    );
};

export default EditComment;
