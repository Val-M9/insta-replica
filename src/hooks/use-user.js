import { useState, useEffect } from "react";
import { getUserByUserId } from "../services/firebaseServices";

const useUser = (userId) => {
  const [activeUser, setActiveUser] = useState({});

  useEffect(() => {
    async function getUserObjByUserId() {
      // function from firebase service that gets the user data based on the id
      const [user] = await getUserByUserId(userId);
      setActiveUser(user || {});
    }
    if (userId) {
      getUserObjByUserId(userId);
    }
  }, [userId]);

  return { user: activeUser };
};

export default useUser;
