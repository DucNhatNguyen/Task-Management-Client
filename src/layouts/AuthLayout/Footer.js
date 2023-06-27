import React from "react";
import { footerStyles, AuthTheme } from "./styles";
import {
    Grid,
    CssBaseline,
    Typography,
    Divider,
    Link,
} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    const classes = footerStyles(AuthTheme);
    return (
        <div style={{
            display: "flex",
            flexDirection: "column"
        }}>
            <CssBaseline />
            <footer style={{
                padding: "24px 16px",
                marginTop: "auto",
                backgroundColor: "#252329"
            }}>
                <Divider style={{ backgroundColor: "#828282" }} />
                <Grid style={{ marginTop: "15px", }} container alignItems="center">
                    <Grid item xs={11}>
                        <Typography style={{
                            color: "#828282",
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
            </footer>
        </div>
    );
};

export default Footer;
