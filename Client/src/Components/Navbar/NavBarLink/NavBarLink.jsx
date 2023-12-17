import PropTypes from "prop-types";
import { NavLink as NavLinkComp } from "react-router-dom";

export const NavBarLink = ({ to, children, ...props }) => {
  return (
    <NavLinkComp {...props} to={to}>
      {children}
    </NavLinkComp>
  );
};

NavBarLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
