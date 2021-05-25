import { useContext } from "react";
import LoggedInUserContext from "../../context/LoggedInUserContext";
import Suggestions from "./Suggestions";
import User from "./User";

const Sidebar = () => {
  const { user: { docId = "", fullName, username, userId, following } = {} } =
    useContext(LoggedInUserContext);

  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
    </div>
  );
};

export default Sidebar;
