import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../context/FirebaseContext";

const useAuthListener = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("authUser")));
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      // we have a user, therefore we can store user in localstorage
      if (authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        // we don't have a user -> clean localStorage
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });

    return () => listener();
  }, [firebase]);

  return { user };
};

export default useAuthListener;