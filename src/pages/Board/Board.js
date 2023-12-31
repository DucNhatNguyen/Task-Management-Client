import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import { UIContext } from "provider/UIProvider";
import { UserContext } from "provider/UserProvider";
import { AppLayout } from "layouts";
import { BoardDrawer } from "components";
import { BoardHelpers, UIHelpers } from "helpers/";
import TopSection from "./TopSection";
import ListArea from "./ListArea";

const Board = () => {
    const {
        renderedBoard,
        setShowFooter,
        setRenderedBoard,
        setShowAllBoards,
        setOpenBackdrop,
    } = useContext(UIContext);

    const { boards, userData } = useContext(UserContext);
    const { slug } = useParams();

    const [adminPerm, setAdmin] = useState(false);

    useEffect(() => {
        BoardHelpers.FindExactBoard(
            slug,
            boards,
            setRenderedBoard,
            setShowAllBoards,
            setOpenBackdrop,
            setAdmin,
            userData
            );
            setShowFooter(false);
        return () => {
            UIHelpers.HideShowAllBoards(
                renderedBoard,
                setRenderedBoard,
                setShowAllBoards
            );
            setShowFooter(true);
        };
    }, []);

    useEffect(() => {
        BoardHelpers.FindExactBoard(
            slug,
            boards,
            setRenderedBoard,
            setShowAllBoards,
            setOpenBackdrop,
            setAdmin,
            userData
        );
    }, [boards]);

    useEffect(() => {
        if (renderedBoard && renderedBoard.createdby) {
            if (userData.id === renderedBoard.createdby) {
                setAdmin(true);
            }
        }
    }, [renderedBoard]);

    // const findAdminIndex = (userData, adminUid) =>
    //     new Promise((resolve) => {
    //         if (userData) {
    //             userData.map((user, index) => {
    //                 if (user.uid === adminUid) resolve(index);
    //             });
    //         }
    //     });

    // useEffect(() => {
    //     if (renderedBoard) {
    //         let newState = { ...renderedBoard };
    //         if (renderedBoard.userData[0].uid !== renderedBoard.admin.uid) {
    //             //reordering userData array for UI purposes
    //             findAdminIndex(renderedBoard.userData, renderedBoard.admin.uid).then(
    //                 (index) => {
    //                     let temp = renderedBoard.userData[0];
    //                     newState.userData[0] = newState.userData[index];
    //                     newState.userData[index] = temp;
    //                     // setRenderedBoard({...renderedBoard, userData: newState.userData})
    //                     setRenderedBoard(newState);
    //                 }
    //             );
    //         }
    //     }
    // }, [renderedBoard]);

    return (
        <AppLayout>
            <div style={{ height: "100%" }}>
                <Container component="main" maxWidth="xxl">
                    <BoardDrawer admin={adminPerm} board={renderedBoard} />
                    <TopSection admin={adminPerm} board={renderedBoard} />
                    <ListArea board={renderedBoard} />
                </Container>
            </div>
        </AppLayout>
    );
};

export default Board;
