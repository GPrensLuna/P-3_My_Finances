import { NavBarLink } from "./NavBarLink/NavBarLink.jsx";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";

export const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const content = (
    <div className="lg:hidden block absolute top-10 w-full left-0 right-0 transition bg-sky-700">
      <ul className="text-center text-x1 p-10">
        <li className=" my-4 py-4 border-b border-slate.800 hover:bg-slate-800 hover:rounded">
          <NavBarLink spy="true" smooth="true" className="" to="/">
            Home
          </NavBarLink>
        </li>
        <li className=" my-4 py-4 border-b border-slate.800 hover:bg-slate-800 hover:rounded">
          <NavBarLink spy="true" smooth="true" className="" to="Insect">
            Insect Data
          </NavBarLink>
        </li>
        <li className=" my-4 py-4 border-b border-slate.800 hover:bg-slate-800 hover:rounded">
          <NavBarLink spy="true" smooth="true" className="" to="Dashboard">
            Dashboard
          </NavBarLink>
        </li>
      </ul>
    </div>
  );
  return (
    <nav
      className="bg-gradient-to-r from-blue-950 via-sky-800 to-sky-600"
      style={{ minWidth: "450px" }}
    >
      <div className="h-10vh flex justify-between z-50 text-white  lg:py-5 px-20 py-4">
        <div className=" flex items-center flex-1">
          <NavBarLink className="" to="/">
            <span className="text-3-x1 font-bold">logo</span>
          </NavBarLink>
        </div>
        <div className="lg:flex sm:flex lg: flex-1 items-center justify-end font-normal hidden">
          <div className="flex-10">
            <ul className="flex gap-8 mr-16 text-[16px]">
              <li className="hover:text-sky-300 border-1  transit border-b-2  hover:border-blue-950 border-1 border-cyan-50  cursor-pointer">
                <NavBarLink spy="true" smooth="true" className="" to="/">
                  Home
                </NavBarLink>
              </li>
              <li className="hover:text-sky-300 border-1 transit border-b-2 hover:border-blue-950 border-1 border-cyan-50  cursor-pointer">
                <NavBarLink spy="true" smooth="true" className="" to="Insect">
                  Insect Data
                </NavBarLink>
              </li>
              <li className="hover:text-sky-300 border-1 transit border-b-2 hover:border-blue-950 border-1 border-cyan-50  cursor-pointer">
                <NavBarLink
                  className=""
                  spy="true"
                  smooth="true"
                  to="dashboard"
                  duration={500}
                  offset={-50}
                >
                  Dashboard
                </NavBarLink>
              </li>
              <li className="mb-3 xl:w-96">
                <input
                  type="search"
                  className="relative m-0 block w-full min-w-0 flex-auto border  border-b-1 border-l-0 border-r-0 border-t-0 rounded-md bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] outline-none transition duration-200 ease-in-out focus:z-[3] focus:text-slate-300 "
                  id="search"
                  placeholder="Search"
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="lg:hidden sm:block">{click && content}</div>
        <button className="block sm:hidden transition" onClick={handleClick}>
          {click ? <FaTimes /> : <CiMenuBurger />}
        </button>
      </div>
    </nav>
  );
};
