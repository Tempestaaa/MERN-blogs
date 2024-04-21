import {
  Button,
  Navbar,
  NavbarCollapse,
  NavbarToggle,
  TextInput,
} from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import { IoIosMoon } from "react-icons/io";
import { IoLibrary } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const { pathname } = useLocation();

  return (
    <Navbar className="bg-black">
      {/* Logo */}
      <Link
        to="/"
        className="self-center whitespace-nowrap flex items-center gap-1"
      >
        <div className=" px-3 py-2 bg-gradient-to-r from-indigo-500 via-blue-500 to-pink-500 rounded-xl grid place-items-center text-xl">
          <IoLibrary />
        </div>
        <span className="text-2xl italic font-semibold">MyBlog</span>
      </Link>

      {/* Search */}
      <form>
        <TextInput
          id="search"
          type="text"
          placeholder="Search..."
          rightIcon={CiSearch}
        />
      </form>

      <div className="flex items-center gap-2">
        <Button color="dark" pill>
          <IoIosMoon />
        </Button>
        <NavbarToggle />
      </div>

      <NavbarCollapse>
        <Navbar.Link as={"div"} active={pathname === ""}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"} active={pathname === "about"}>
          <Link to="about">About</Link>
        </Navbar.Link>
      </NavbarCollapse>
    </Navbar>
  );
};

export default Nav;
