import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fas fa-code"></i>Job-Skul
          </Link>
        </h1>
        <ul>
          <li>
            <Link to="profiles.html">Students</Link>
          </li>
          <li>
            <Link to="Register">Register</Link>
          </li>
          <li>
            <Link to="Login">Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
