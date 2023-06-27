import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { AppTheme } from "./styles";
import { ThemeProvider } from "@mui/material/styles";

const AppLayout = ({ children }) => {
    const [changeBackground, setChangeBackground] = useState(false);
    let location = useLocation();

    useEffect(() => {
        if (location.pathname === "/boards") {
            setChangeBackground(true);
        } else {
            setChangeBackground(false);
        }
    }, []);

    return (
        <ThemeProvider theme={AppTheme}>
            <div
                style={{
                    backgroundColor: changeBackground === true ? "#F8F9FD" : "#FFFFFF",
                    minHeight: "100vh",
                    boxShadow: "0px 2px 2px rgb(0 0 0 / 5%)"
                }}
            >
                <header>
                    <Header />
                </header>
                <div
                    style={{
                        backgroundColor:
                            changeBackground === true ? "#F8F9FD" : "#FFFFFF",
                        minHeight: "80vh",
                        fontFamily: "Poppins"
                    }}
                >
                    {children}
                </div>
                <footer style={{
                    padding: "0 16px",
                    marginTop: "auto"
                }}>
                    <Footer />
                </footer>
            </div>
        </ThemeProvider>
    );
};

export default AppLayout;
