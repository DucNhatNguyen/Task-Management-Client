import React from "react";
import { Grid, Typography } from "@mui/material";
import { Description, AccountCircle, People, Label } from "@mui/icons-material";

const SectionTitle = ({ icon, title, alignItems }) => {
    return (
        <Grid item container alignItems={alignItems ? alignItems : "center"} xs={12}>
            <Grid item>
                {icon === "description" ? (
                    <Description style={{
                        fontSize: "1rem",
                        color: "#BDBDBD"
                    }} />
                ) : icon === "account" ? (
                    <AccountCircle style={{
                        fontSize: "1rem",
                        color: "#BDBDBD"
                    }} />
                ) : icon === "people" ? (
                    <People style={{
                        fontSize: "1rem",
                        color: "#BDBDBD"
                    }} />
                ) : (
                    icon === "label" && <Label style={{
                        fontSize: "1rem",
                        color: "#BDBDBD"
                    }} />
                )}
            </Grid>
            <Grid item>
                <Typography style={{
                    fontWeight: "600",
                    fontSize: "0.725rem",
                    letterSpacing: "-0.035em",
                    color: "#BDBDBD",
                    marginLeft: "8px",
                    lineHeight: "1rem",
                }}>{title}</Typography>
            </Grid>
        </Grid>
    );
};

export default SectionTitle;
