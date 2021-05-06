import { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import { getUserByUserId } from "../services/firebaseServices";

const useUser = () => {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUserObjByUserId() {
      // function from firebase service that gets the user data based on the id
      const [response] = await getUserByUserId(user.uid);
      setActiveUser(response);
    }
    if (user?.uid) {
      getUserObjByUserId();
    }
  }, [user]);

  return { user: activeUser };
};

export default useUser;
