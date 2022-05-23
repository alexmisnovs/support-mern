import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>
      <ul>
        <li>
          <FaSignInAlt />
          <Link to="/login">Login</Link>
        </li>
        <li>
          <FaUser />
          <Link to="/register">Register</Link>
        </li>
        <li>
          <FaSignOutAlt />
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
