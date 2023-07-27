import React, { useContext } from "react";
import {
    Route,
    Routes
} from "react-router-dom";
import { Boards, Login, SignUp, Profile } from "pages";
import Board from "pages/Board/Board";
import { Authentication } from "provider/AuthProvider";

const Layout = (props) => {
    const { token } = useContext(Authentication);

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
                element={<Boards />}
                exact
                path="/"
            />
            <Route
                element={<Profile />}
                exact
                path="/profile"
            />
            <Route
                element={<Board />}
                exact
                path="/board/:slug"
            />
        </Routes>
    );
};

export default Layout;
