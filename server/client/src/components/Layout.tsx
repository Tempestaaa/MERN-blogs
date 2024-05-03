import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import ScrollToTop from "./ScrollToTop";

const Layout = () => {
  return (
    <div className="min-h-svh flex flex-col font-default overflow-auto">
      <ScrollToTop />

      <Nav />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
