import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import FirebaseContext from "../context/FirebaseContext";
import * as ROUTES from "../constants/routes";
import { doesUsernameExists } from "../services/firebaseServices";

const SignUp = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || email === "";

  const handleSignUp = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExists(username);
    console.log("username", usernameExists);
    if (!usernameExists.length) {
      try {
        const createdUserResult = await firebase.auth().createUserWithEmailAndPassword(email, password);

        // auth -> email & password & username (displayName)
        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        //firebase user collection (create a document)
        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          email: email.toLowerCase(),
          following: [],
          dateCreated: Date.now(),
        });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setFullName("");
        setEmail("");
        setPassword("");
        setError(error.message);
      }
    } else {
      setError("That username is already taken, please try another.");
    }
  };

  useEffect(() => {
    document.title = "Sign Up - Instagram";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iPhone img" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 rounded border border-gray-primary mb-4">
          <h1 className="flex justify-center w-full">
            <img src="/images/logo.png" alt="logo" className="mt-2 w-6/12 mb-4" />
          </h1>

          {error && <p className="mb-4 text-xs font-bold text-red-primary">{error}</p>}

          <form onSubmit={handleSignUp} method="POST">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2
                       border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full Name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2
                       border border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2
                       border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmail(target.value)}
              value={email}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2
                       border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && "opacity-50"}`}
            >
              Sign Up
            </button>
          </form>
        </div>

        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Already have an account?{` `}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignUp;