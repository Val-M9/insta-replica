import { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Timeline from "../components/Timeline";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard - Instagram";
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid grid-cols-3 gap-4 mx-auto max-w-screen-lg">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
