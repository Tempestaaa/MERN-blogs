import { Button, Navbar, TextInput } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import { IoIosMoon } from "react-icons/io";
import { IoLibrary } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const { pathname } = useLocation();

  return (
    <Navbar className="bg-black border-b-2">
      {/* Logo */}
      <Navbar.Brand as={"div"}>
        <Link
          to="/"
          className="self-center whitespace-nowrap flex items-center gap-1 text-2xl"
        >
          <div className=" px-3 py-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-pink-500 rounded-xl grid place-items-center ">
            <IoLibrary />
          </div>
          <span className="italic font-semibold">MyBlog</span>
        </Link>
      </Navbar.Brand>

      {/* Search */}
      <form>
        <TextInput
          id="search"
          type="text"
          placeholder="Search..."
          rightIcon={CiSearch}
          className="hide lg:inline"
        />
      </form>

      <div className="flex items-center gap-2 md:order-2">
        <Button pill color={"dark"} className="lg:hidden">
          <CiSearch />
        </Button>
        <Button color="dark" pill>
          <IoIosMoon />
        </Button>
        <Button gradientDuoTone="purpleToBlue" outline>
          <Link to="sign-in">Sign In</Link>
        </Button>
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse className="order-1">
        <Navbar.Link as={"div"} active={pathname === "/"}>
          <Link to="/" className="block">
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link as={"div"} active={pathname === "/about"}>
          <Link to="about" className="block">
            About
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Nav;
