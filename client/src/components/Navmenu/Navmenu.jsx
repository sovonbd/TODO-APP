import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BiSun } from "react-icons/bi";
import { BsFillMoonFill } from "react-icons/bs";
import { AuthContext } from "../../provider/AuthProvider";

const Navmenu = () => {
  const initialTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const { user, logOut } = useContext(AuthContext);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }
  // console.log(user);

  const menu = (
    <div className="flex flex-col md:flex-row md:gap-8 gap-2 lg:text-lg">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "border-b-[3px] border-orange-500"
            : "link-underline link-underline-color"
        }>
        Home
      </NavLink>
      <NavLink
        to="/aboutus"
        className={({ isActive }) =>
          isActive
            ? "border-b-[3px] border-orange-500"
            : "link-underline link-underline-color"
        }>
        About Us
      </NavLink>
      <NavLink
        to="/chat"
        className={({ isActive }) =>
          isActive
            ? "border-b-[3px] border-orange-500"
            : "link-underline link-underline-color"
        }>
        Customer Service
      </NavLink>
    </div>
  );
  return (
    <div className="py-2 lg:pt-4">
      <div className="navbar justify-between items-center px-0">
        <div className="navbar-start w-auto md:hidden">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden px-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box text-black backdrop-blur-sm w-40">
              {menu}
            </ul>
          </div>
        </div>
        <Link className="btn btn-ghost normal-case hover:bg-transparent text-xl lg:bottom-4 px-0">
          <Link to="/">
            TODO <span className="text-[#F36527]">APP</span>
          </Link>
        </Link>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1">{menu}</ul>
        </div>
        <div className="navbar-end w-auto px-0">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user?.photoURL
                        ? user.photoURL
                        : "https://lh3.googleusercontent.com/a/ACg8ocJvDHisVPydZIb8y6TGCfYfOlh0x8Vy5eB72O6EOOgy8YI=s96-c"
                    }
                    alt={user.displayName}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 divide-y-2">
                <li className="hover:bg-transparent">
                  <button
                    className="normal-case hover:bg-transparent  flex justify-center font-bold"
                    disabled>
                    {user?.displayName ? user.displayName : user.email}
                  </button>
                </li>

                <li>
                  <button
                    className="btn btn-sm font-normal btn-ghost normal-case"
                    onClick={logOut}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn bg-[#F36527] text-lg text-white normal-case border-[#F36527] hover:bg-transparent hover:text-black hover:border-[#F36527] hover:border-2">
              Login
            </Link>
          )}
          <div>
            <label className="swap swap-rotate pl-4 text-2xl">
              <input type="checkbox" onChange={handleToggle} />
              <BiSun className="swap-on"></BiSun>
              <BsFillMoonFill className="swap-off"></BsFillMoonFill>
            </label>
          </div>
        </div>
      </div>
      <hr className="border-[1px]" />
    </div>
  );
};

export default Navmenu;
