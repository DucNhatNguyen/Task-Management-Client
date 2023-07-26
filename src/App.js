import React, { useState, useEffect } from "react";
import Loading from "components/Loading"
import { Login } from "pages";
import Routes from "./routes/Routes";
import UserProvider from "provider/UserProvider";
import AuthProvider from "provider/AuthProvider";
import UIProvider from "provider/UIProvider";
import { UserHelpers } from "helpers";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [userData, setUserData] = useState();
  const [boards, setBoards] = useState([]);
  const [renderedBoard, setRenderedBoard] = useState();
  const userid = localStorage.getItem("pmt_userid");

  const navigate = useNavigate();

  useEffect(() => {
    if (userid) {
      UserHelpers.HandleUserData(
        userid,
        setUserData,
        setBoards,
        setOpenBackdrop,
        userData
      );
      navigate("/boards");
    } else {
      navigate("/login");
    }

    // if (!userData) {
    //   if (userid){
    //     UserHelpers.HandleUserData(
    //         userid,
    //         setUserData,
    //         setBoards,
    //         setOpenBackdrop,
    //         userData
    //       );
    //   } else{
    //     return;
    //   }
    // }
  }, [userid]);

  return (
    <UIProvider
      openBackdrop={openBackdrop}
      setOpenBackdrop={setOpenBackdrop}
      renderedBoard={renderedBoard}
      setRenderedBoard={setRenderedBoard}
    >
      <AuthProvider
        setUserData={setUserData}
        setBoards={setBoards}
        setOpenBackdrop={setOpenBackdrop}
      >
        <UserProvider
          userData={userData}
          setUserData={setUserData}
          boards={boards}
          setBoards={setBoards}
          setOpenBackdrop={setOpenBackdrop}
          renderedBoard={renderedBoard}
          setRenderedBoard={setRenderedBoard}
        >
          <div className="App">
            <Loading />
            <Routes />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              />
          </div>
        </UserProvider>
      </AuthProvider>
    </UIProvider>
  );
}

export default App;
