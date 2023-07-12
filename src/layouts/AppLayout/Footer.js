import React from "react";
import {
    Grid,
    CssBaseline,
    Typography,
    Divider,
    Link,
} from "@mui/material";
import { UIContext } from "provider/UIProvider";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/FacebookOutlined";

const Footer = () => {
    const { showFooter } = React.useContext(UIContext);

    return (
        <div
            style={{
                display: showFooter === true ? "flex" : "none",
                flexDirection: "column"
            }}
        >
            <CssBaseline />
            <Divider style={{ backgroundColor: "#333333" }} />
            <Grid style={{
                marginTop: "20px",
                marginBottom: "20px"
            }}
                container alignItems="center">
                <Grid item xs={11}>
                    <Typography style={{
                        color: "#333333",
                        textAlign: "start",
                        fontWeight: "500",
                        paddingLeft: "10px"
                    }}
                        variant="body2">
                        Trello Clone
                    </Typography>
                </Grid>
                <Grid item xs={1} style={{ textAlign: "center" }}>
                    <Link
                        href="https://github.com/DucNhatNguyen/Task-Management-Client"
                        variant="body2"
                        target="_blank"
                        rel="noopener"
                    >
                        <GitHubIcon />
                    </Link>
                    <Link
                        href=""
                        variant="body2"
                        target="_blank"
                        rel="noopener"
                    >
                        <FacebookIcon />
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
};

export default Footer;
