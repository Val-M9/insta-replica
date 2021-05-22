import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FirebaseContext from "./context/FirebaseContext";
import { firebase, FieldValue } from "./lib/firebaseLib";
import "./styles/app.css";

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
