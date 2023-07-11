import React, { useState, useEffect } from "react";
import Loading from "components/Loading"
import { Login } from "pages";
import Routes from "./routes/Routes";
import UserProvider from "provider/UserProvider";
import AuthProvider from "provider/AuthProvider";
import UIProvider from "provider/UIProvider";
import { UserHelpers } from "helpers";

function App() {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [userData, setUserData] = useState({});
  const [boards, setBoards] = useState([]);
  const [renderedBoard, setRenderedBoard] = useState();
  const userid = localStorage.getItem("pmt_userid");

  useEffect(() => {
    if (userData) {
      console.log('userdatasssss', userData);
      if (userid){
        UserHelpers.HandleUserData(
            userid,
            setUserData,
            setBoards,
            setOpenBackdrop,
            userData
          );
      } else{
        return;
      }
    }
  }, []);

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
          </div>
        </UserProvider>
      </AuthProvider>
    </UIProvider>
  );
}

export default App;
