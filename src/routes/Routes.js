import React from "react";
import {
    Route,
    Routes
} from "react-router-dom";
import { Boards, Login, SignUp } from "pages";
import Board from "pages/Board/Board";
//import { Authentication } from "provider/AuthProvider"

const Layout = (props) => {
    //const { token } = useContext(Authentication);
    const token = null;
    return (

        <Routes>
            <Route
                element={<Login />}
                exact
                path="/login"
            />
            <Route
                element={<SignUp />}
                exact
                path="/signup"
            />
            <Route
                element={<Boards />}
                exact
                path="/boards"
            />
            <Route
                element={<Board />}
                exact
                path="/board/:id"
            />
        </Routes>
    );
};

export default Layout;
