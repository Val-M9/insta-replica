import { useEffect } from "react";
import PropTypes from "prop-types";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Timeline from "../components/Timeline";
import LoggedInUserContext from "../context/LoggedInUserContext";
import useUser from "../hooks/use-user";

const Dashboard = ({ user: loggedInUser }) => {
  const { user } = useUser(loggedInUser.uid);
  useEffect(() => {
    document.title = "Dashboard - Instagram";
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ user }}>
      <div className="bg-gray-background">
        <Header />
        <div className="grid grid-cols-3 gap-4 mx-auto max-w-screen-lg">
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Dashboard;
