import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar bg-dark">
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
        <ul>
          <li>
            <a href="profile.html">Developers</a>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Navbar;
