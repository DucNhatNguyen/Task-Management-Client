import React, { useEffect, useState } from "react";
import { Typography, Grid, Button } from "@mui/material";
// import { GetUniqueId } from "api/Common";
import { PopMenu } from "./styles";
import { colors } from "./color";

const LabelsMenu = ({ anchorEl, handleClose, addLabel }) => {
  const [input, setInput] = useState("");
  const [selectedColor, setSelectedColor] = useState(1917);
  const [error, setError] = useState();

  const handleButtonClick = () => {
    if (input.trim() <= 0) {
      setError("Label title cannot be empty!");
    } else if (selectedColor === 1917) {
      setError("Select a color!");
    } else {
    //   GetUniqueId()
    //     .then((id) => {
    //       addLabel({
    //         id: id.data,
    //         input: input,
    //         color: colors[selectedColor],
    //       });
    //       setError();
    //       setInput("");
    //       handleClose();
    //     })
    //     .catch((err) => {
    //       setError(err);
    //     });
    }
  };


  return (
    <div>
      <PopMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Grid style={{
            paddingLeft: "12px",
            paddingRight: "12px",
            paddingTop: "14.4px",
            outlineWidth: "0"
        }} container>
          <Grid item xs={12}>
            <Typography style={{
                color: "black",
                fontWeight: "600",
                fontSize: "1rem"
            }} component="p">
              Label
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography style={{
                marginTop: "4px",
                color: "#828282",
                fontSize: "0.875rem"
            }} component="p">
              Enter a name and select a color
            </Typography>
          </Grid>
        </Grid>
        <Grid style={{
            paddingLeft: "12px",
            paddingRight: "12px",
            paddingTop: "14.4px",
            paddingBottom: "14.4px"
        }} container>
          <Grid item container xs={12} style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgb(0 0 0 / 15%)"
          }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Keywords..."
              type="text"
              style={{
                width: "100%",
                height: "100%",
                paddingLeft: "16px",
                paddingTop: "8px",
                paddingBottom: "8px",
                outlineWidth: "0",
                color: "#757575",
                letterSpacing: "-0.035em",
                fontWeight: "500",
                fontFamily: "Poppins",
                fontSize: "0.875rem",
                border: "none",
                borderRadius: "8px",
              }}
              onKeyDown={(e) => e.stopPropagation()}
            />
          </Grid>
        </Grid>
        <Grid style={{
            paddingLeft: "12px",
            paddingRight: "12px",
            paddingTop: "14.4px",
            paddingBottom: "14.4px"
        }}
         container>
          {colors.map((color, key) => {
            return (
              <Grid
                item
                container
                justify="center"
                xs={3}
                style={{ marginBottom: "8px" }}
                key={key}
              >
                <div
                  onClick={() => setSelectedColor(key)}
                  style={{
                    backgroundColor: color.hex,
                    transform: selectedColor === key && "scale(1.05)",
                    borderRadius: "4px",
                    height: "28px",
                    width: "90%",
                    opacity: "0.92",
                    "&:hover": {
                    cursor: "pointer",
                    opacity: "1",
                    transition: "all .2s ease-in-out",
                    },
                  }}
                >
                </div>
              </Grid>
            );
          })}
        </Grid>
        <Grid container>
          {error && (
            <Grid item container xs={12} justify="center">
              <Typography style={{
                color: "#EB5757",
                marginBottom: "8px",
                fontWeight: "600",
                fontSize: "0.825rem"
              }}>{error}</Typography>
            </Grid>
          )}
          <Grid item container justify="center" xs={12}>
            <Button
              onClick={handleButtonClick}
              style={{
                 width: "30%",
                marginRight: "10px",
                marginTop: "5px",
                borderRadius: "8px",
                fontWeight: 500,
                fontSize: "0.775rem",
                lineHeight: "14px",
                letterSpacing: "-0.035em",
                height: "32px",
                marginBottom: "8px"
              }}
              variant="contained"
              color="primary"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </PopMenu>
    </div>
  );
};

export default LabelsMenu;