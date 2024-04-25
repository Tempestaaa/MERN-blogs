import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const Layout = () => {
  return (
    <div className="min-h-svh flex flex-col font-default">
      <Nav />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
