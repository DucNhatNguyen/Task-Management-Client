import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Typography } from "@mui/material";
import { Dashboard, Apps } from "@mui/icons-material";
import Menu from "./Menu";
import { headerStyles, useToolbar, useIconButton, useMenuTitle, useTypography, useAppBar, useAllBoardsButton, useTitle } from "./styles";
//import { UIContext } from "provider/UIProvider";

const Header = () => {
    let navigate = useNavigate();
    const { styledToolbar: StyledToolbar } = useToolbar();
    const { styledIconButton: StyledIconButton } = useIconButton();
    const { styledMenuTitle: StyledMenuTitle } = useMenuTitle();
    const { styledAppBar: StyledAppBar } = useAppBar();
    const { styledTitle: StyledTitle } = useTitle();
    //const { showAllBoards, renderedBoard } = useContext(UIContext);
    const showAllBoards = true;
    const renderedBoard = null;

    return (
        <div style={{ flexGrow: 1 }}>
            <StyledAppBar position="static">
                <StyledToolbar>
                    <StyledIconButton
                        edge="start"
                        aria-label="menu"
                        onClick={() => navigate("/boards")}
                    >
                        <Dashboard style={{
                            color: "#2F80ED",
                            fontSize: "2rem"
                        }}
                        />
                        <StyledMenuTitle variant="h6">
                            Trello
                        </StyledMenuTitle>
                    </StyledIconButton>

                    {showAllBoards === true ? (
                        <div style={{
                            justifyContent: "flex-start",
                            display: "flex",
                            alignItems: "center",
                            flexGrow: "1"
                        }}
                        >
                            <StyledTitle>
                                {"Test Board1"}
                            </StyledTitle>
                            <IconButton
                                onClick={() => navigate("/boards")}
                                style={{
                                    marginLeft: "24px",
                                    borderRadius: "8px",
                                    backgroundColor: "#F2F2F2",
                                    paddingTop: "6px",
                                    paddingBottom: "6px"
                                }}
                            >
                                <Apps style={{ color: "#828282" }} />
                                <Typography style={{
                                    color: "#828282",
                                    fontSize: "0.75rem",
                                    fontWeight: "500",
                                    lineHeight: "18px",
                                    letterSpacing: "-0.035em",
                                    fontFamily: "Poppins"
                                }}>
                                    All Boards
                                </Typography>
                            </IconButton>
                        </div>
                    ) : (
                        <div style={{
                            justifyContent: "flex-start",
                            display: "flex",
                            alignItems: "center",
                            flexGrow: "1"
                        }}></div>
                    )}
                    <Menu navigate={navigate} />
                </StyledToolbar>
            </StyledAppBar>
        </div>
    );
};

export default Header;
