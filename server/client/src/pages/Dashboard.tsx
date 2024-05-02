import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSideBar from "../components/DashSideBar";
import DashProfile from "../components/DashProfile";
import DashBlogs from "../components/DashBlogs";
import DashUsers from "../components/DashUsers";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) setTab(tabFromUrl);
  }, [location.search]);

  return (
    <div className="flex flex-col md:flex-row h-full w-full min-h-svh">
      <div className="md:w-56">
        <DashSideBar />
      </div>
      <div className="flex-1">
        {tab === "profile" && <DashProfile />}
        {tab === "blogs" && <DashBlogs />}
        {tab === "users" && <DashUsers />}
      </div>
    </div>
  );
};

export default Dashboard;
