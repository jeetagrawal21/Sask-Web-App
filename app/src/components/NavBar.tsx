import React from "react";
import "../stylings/NavBar.css";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="nav-link" href="#">
        About
      </a>
      <a className="nav-link" href="#">
        Contact us
      </a>
      <a className="nav-link" href="#">
        Help
      </a>
    </nav>
  );
}

export default NavBar;
