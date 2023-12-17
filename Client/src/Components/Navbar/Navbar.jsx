import { Link } from "react-scroll";
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
          <Link
            className={style.Link}
            spy={true}
            smooth={true}
            to="Home"
            duration={500}
            offset={-50}
          >
            Home
          </Link>
        </li>
        <li className={style.NavBarLi2}>
          <Link
            className={style.Link}
            spy={true}
            smooth={true}
            to={"Insect"}
            duration={500}
            offset={-50}
          >
            Insect Data
          </Link>
        </li>
        <li className={style.NavBarLi2}>
          <Link className={style.Link} spy={true} smooth={true} to="Table">
            Table
          </Link>
        </li>
      </ul>
    </div>
  );
  return (
    <nav>
      <div className={style.NavBarContainer}>
        <div className={style.LogoContainer}>
          <span className={style.Logo}>logo</span>
        </div>
        <div className={style.NavBar}>
          <div className={style.NavBarOp}>
            <ul className={style.NavBarLu}>
              <li className={style.NavBarLi}>
                <Link className={style.Link} spy={true} smooth={true} to="Home">
                  Home
                </Link>
              </li>
              <li className={style.NavBarLi}>
                <Link
                  className={style.Link}
                  spy={true}
                  smooth={true}
                  to="Insect"
                >
                  Insect Data
                </Link>
              </li>
              <li className={style.NavBarLi}>
                <Link
                  className={style.Link}
                  spy={true}
                  smooth={true}
                  to="Table"
                  duration={500}
                  offset={-50}
                >
                  Table
                </Link>
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
