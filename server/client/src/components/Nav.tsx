import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import { IoLibrary } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../services/store";
import { FaMoon, FaSun } from "react-icons/fa";
import { toggleTheme } from "../services/theme/theme.slice";
import { signOutSuccess } from "../services/user/user.slice";
import { useEffect, useState } from "react";

const Nav = () => {
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { theme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) console.log(data.message);
      else dispatch(signOutSuccess());
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) setSearchTerm(searchTermFromUrl);
  }, [location.search]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className="border-b-2">
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
      <form onSubmit={handleSubmit}>
        <TextInput
          id="search"
          type="text"
          placeholder="Search..."
          rightIcon={CiSearch}
          className="hide lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      <div className="flex items-center gap-2 md:order-2">
        <Button pill color={"dark"} className="lg:hidden">
          <CiSearch />
        </Button>
        <Button color="dark" pill onClick={() => dispatch(toggleTheme())}>
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser.username ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="user"
                img={currentUser.profilePicture}
                rounded
              ></Avatar>
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to="/dashboard?tab=profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}

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
