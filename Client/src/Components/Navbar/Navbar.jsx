import { NavBarLink } from "./NavBarLink/NavBarLink.jsx";
import style from "./NavBar.module.css";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";

export const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const content = (
    <div className={style.NavBarOp2}>
      <ul className={style.NavBarLu2}>
        <li className={style.NavBarLi2}>
          <NavBarLink
            spy="true"
            smooth="true"
            className={style.NavBarLink}
            to="/"
          >
            Home
          </NavBarLink>
        </li>
        <li className={style.NavBarLi2}>
          <NavBarLink
            spy="true"
            smooth="true"
            className={style.NavBarLink}
            to="Insect"
          >
            Insect Data
          </NavBarLink>
        </li>
        <li className={style.NavBarLi2}>
          <NavBarLink
            spy="true"
            smooth="true"
            className={style.NavBarLink}
            to="Table"
          >
            Table
          </NavBarLink>
        </li>
      </ul>
    </div>
  );
  return (
    <nav>
      <div className={style.NavBarContainer}>
        <div className={style.LogoContainer}>
          <NavBarLink className={style.NavBarLinkLogo} to="/">
            <span className={style.Logo}>logo</span>
          </NavBarLink>
        </div>
        <div className={style.NavBar}>
          <div className={style.NavBarOp}>
            <ul className={style.NavBarLu}>
              <li className={style.NavBarLi}>
                <NavBarLink
                  spy="true"
                  smooth="true"
                  className={style.NavBarLink}
                  to="/"
                >
                  Home
                </NavBarLink>
              </li>
              <li className={style.NavBarLi}>
                <NavBarLink
                  spy="true"
                  smooth="true"
                  className={style.NavBarLink}
                  to="Insect"
                >
                  Insect Data
                </NavBarLink>
              </li>
              <li className={style.NavBarLi}>
                <NavBarLink
                  className={style.NavBarLink}
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
        <div>{click && content}</div>
        <button className={style.NavBarButton} onClick={handleClick}>
          {click ? <FaTimes /> : <CiMenuBurger />}
        </button>
      </div>
    </nav>
  );
};
