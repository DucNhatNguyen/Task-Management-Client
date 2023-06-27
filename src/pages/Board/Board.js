import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
// import { UIContext } from "provider/UIProvider";
// import { UserContext } from "provider/UserProvider";
import { AppLayout } from "layouts";
import { BoardDrawer } from "components";
// import { BoardHelpers, UIHelpers } from "helpers/";
import TopSection from "./TopSection";
import ListArea from "./ListArea";

const renderedBoard = {
    "admin": {
        "boards": {
            "-NYX6AimlUULSlFxgv6E": {
                "boardId": "-NYX6AimlUULSlFxgv6E"
            }
        },
        "email": "ducnhat090199@gmail.com",
        "name": "N.T MAX",
        "picture": "https://lh3.googleusercontent.com/a/AAcHTtcmuVue47yEfADs1fvleNkCkS2XyQywMpft_yuO=s96-c",
        "uid": "JekzTyjSkDg4DyoRvFJcdbr1u9n1"
    },
    "coverPhoto": "https://images.unsplash.com/photo-1615058712849-d33b9e7824c5?ixid=MnwyMDY2MzR8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MTY1MDcwODQ&ixlib=rb-1.2.1",
    "date": "June 22, 2023",
    "id": "-NYYV0DUybOzG5C_grEt",
    "title": "dasasdas",
    "users": [
        {
            "uid": "JekzTyjSkDg4DyoRvFJcdbr1u9n1"
        }
    ],
    "visibility": "Private",
    "userData": [
        {
            "boards": {
                "-NYX6AimlUULSlFxgv6E": {
                    "boardId": "-NYX6AimlUULSlFxgv6E"
                },
                "-NYYV0DUybOzG5C_grEt": {
                    "boardId": "-NYYV0DUybOzG5C_grEt"
                }
            },
            "email": "ducnhat090199@gmail.com",
            "name": "N.T MAX",
            "picture": "https://lh3.googleusercontent.com/a/AAcHTtcmuVue47yEfADs1fvleNkCkS2XyQywMpft_yuO=s96-c",
            "uid": "JekzTyjSkDg4DyoRvFJcdbr1u9n1"
        }
    ]
}

const Board = () => {

    // const {
    //     renderedBoard,
    //     setShowFooter,
    //     setRenderedBoard,
    //     setShowAllBoards,
    //     setOpenBackdrop,
    // } = useContext(UIContext);
    //const { boards, userData } = useContext(UserContext);
    const { id } = useParams();

    const [adminPerm, setAdmin] = useState(true);

    // useEffect(() => {
    //     BoardHelpers.FindExactBoard(
    //         id,
    //         boards,
    //         setRenderedBoard,
    //         setShowAllBoards,
    //         setOpenBackdrop
    //     );
    //     setShowFooter(false);
    //     return () => {
    //         UIHelpers.HideShowAllBoards(
    //             renderedBoard,
    //             setRenderedBoard,
    //             setShowAllBoards
    //         );
    //         setShowFooter(true);
    //     };
    // }, []);

    // useEffect(() => {
    //     BoardHelpers.FindExactBoard(
    //         id,
    //         boards,
    //         setRenderedBoard,
    //         setShowAllBoards,
    //         setOpenBackdrop
    //     );
    // }, [boards]);

    // useEffect(() => {
    //     if (renderedBoard && renderedBoard.admin) {
    //         if (userData.uid === renderedBoard.admin.uid) {
    //             setAdmin(true);
    //         }
    //     }
    // }, [renderedBoard, userData]);

    const findAdminIndex = (userData, adminUid) =>
        new Promise((resolve) => {
            if (userData) {
                userData.map((user, index) => {
                    if (user.uid === adminUid) resolve(index);
                });
            }
        });

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
