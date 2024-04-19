import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-svh flex flex-col gap-2 font-default bg-primary text-sub">
      <Nav />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
