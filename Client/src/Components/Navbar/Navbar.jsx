import { NavBarLink } from "./NavBarLink/NavBarLink.jsx";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";

export const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const content = (
    <div className="lg:hidden block absolute top-10 w-full left-0 right-0 bg-slate-900 transition">
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
    <nav className="bg-slate-900" style={{ minWidth: "450px" }}>
      <div className="h-10vh flex justify-between z-50 text-white lg:py-5 px-20 py-4">
        <div className=" flex items-center flex-1">
          <NavBarLink className="" to="/">
            <span className="text-3-x1 font-bold">logo</span>
          </NavBarLink>
        </div>
        <div className="lg:flex sm:flex lg: flex-1 items-center justify-end font-normal hidden">
          <div className="flex-10">
            <ul className="flex gap-8 mr-16 text-[16px]">
              <li className="hover:text-fuchsia-600 transit border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                <NavBarLink spy="true" smooth="true" className="" to="/">
                  Home
                </NavBarLink>
              </li>
              <li className="hover:text-fuchsia-600 transit border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                <NavBarLink spy="true" smooth="true" className="" to="Insect">
                  Insect Data
                </NavBarLink>
              </li>
              <li className="hover:text-fuchsia-600 transit border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
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
