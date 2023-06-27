import React from "react";
import {
    Grid,
    CssBaseline,
    Typography,
    Divider,
    Link,
} from "@mui/material";
//import { UIContext } from "provider/UIProvider";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
    //const { showFooter } = React.useContext(UIContext);
    const showFooter = true;
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
                        Developed by Hüseyin Bera Bulut
                    </Typography>
                </Grid>
                <Grid item xs={1} style={{ textAlign: "center" }}>
                    <Link
                        href="https://github.com/berabulut/project-manager"
                        variant="body2"
                        target="_blank"
                        rel="noopener"
                    >
                        <GitHubIcon />
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
};

export default Footer;
