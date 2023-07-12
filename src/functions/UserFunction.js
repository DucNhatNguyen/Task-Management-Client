import { FetchUserData } from "api/User";

export const handleSignIn = (response, setUserData, setOpenBackdrop) => {
  if (setUserData) {
      FetchUserData(response.id, setUserData, setOpenBackdrop);
    }
};