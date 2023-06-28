import React, { useState } from "react";
import Loading from "components/Loading"
import { Login } from "pages";
import Routes from "./routes/Routes";
import UserProvider from "provider/UserProvider";
import AuthProvider from "provider/AuthProvider";
import UIProvider from "provider/UIProvider";
// const userDataJson = { "statusCode": 200, "userData": { "boards": { "-NBI9szRg-V7F7J_ixHY": { "boardId": "-NBI9szRg-V7F7J_ixHY" } }, "email": "nguyw461@gmail.com", "name": "Duc Nhat part time", "picture": "https://lh3.googleusercontent.com/a-/AFdZuco1lQe7J7xQNO5LgQPH7qY6fuWCQ0gJlJ7Qko-c=s96-c", "uid": "03KC9ZUFr4azZGpEkUTaHx6lC0k1" } }
// const boardDataJson = { "statusCode": 200, "boardData": [{ "admin": { "email": "nguyw461@gmail.com", "name": "Duc Nhat part time", "picture": "https://lh3.googleusercontent.com/a-/AFdZuco1lQe7J7xQNO5LgQPH7qY6fuWCQ0gJlJ7Qko-c=s96-c", "uid": "03KC9ZUFr4azZGpEkUTaHx6lC0k1" }, "coverPhoto": "https://images.unsplash.com/photo-1615058712849-d33b9e7824c5?ixid=MnwyMDY2MzR8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MTY1MDcwODQ&ixlib=rb-1.2.1", "date": "September 6, 2022", "id": "-NBI9szRg-V7F7J_ixHY", "listOrder": ["593PF46Dk", "uyxLg2sHa"], "lists": { "593PF46Dk": { "id": "593PF46Dk", "taskIds": ["task-1"], "title": "zxczxczxc" }, "uyxLg2sHa": { "id": "uyxLg2sHa", "title": "czxczcxzczxc" } }, "tasks": { "task-1": { "comments": [{ "id": "-NBIA17YrN_Er1BeQ8Ba", "name": "Duc Nhat part time", "picture": "https://lh3.googleusercontent.com/a-/AFdZuco1lQe7J7xQNO5LgQPH7qY6fuWCQ0gJlJ7Qko-c=s96-c", "text": "zxczxczxczxczxczxc", "time": "6 September at 21:20", "uid": "03KC9ZUFr4azZGpEkUTaHx6lC0k1" }], "description": " czxczxczxczxczx", "id": "task-1", "title": "xzczxczxczxc" } }, "title": "zxzczxczxczxczxczxczxczxczxc", "users": [{ "uid": "03KC9ZUFr4azZGpEkUTaHx6lC0k1" }], "visibility": "Private", "userData": [{ "boards": { "-NBI9szRg-V7F7J_ixHY": { "boardId": "-NBI9szRg-V7F7J_ixHY" } }, "email": "nguyw461@gmail.com", "name": "Duc Nhat part time", "picture": "https://lh3.googleusercontent.com/a-/AFdZuco1lQe7J7xQNO5LgQPH7qY6fuWCQ0gJlJ7Qko-c=s96-c", "uid": "03KC9ZUFr4azZGpEkUTaHx6lC0k1" }] }] }

function App() {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [userData, setUserData] = useState();
  const [boards, setBoards] = useState([]);
  const [renderedBoard, setRenderedBoard] = useState();

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
