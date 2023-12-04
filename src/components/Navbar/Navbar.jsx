import { Link } from "react-router-dom"; 
import React, { useState } from "react";
import "./Navbar.css";

export default function Navbar () {
    const [showMenu, setShowMenu] = useState(false);

    return (
      <div className="navbar navbar-expand-md">
        <h3 className="brand-name">Nimbus Note</h3>
        <button
        className="navbar-toggler"
        type="button"
        onClick={() => setShowMenu(!showMenu)}
        aria-label="Toggle navigation"
        > 
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${showMenu ? "show" : ""}`} id="navbarTogglerDemo01"> 
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Project list
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/new">
                New project
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
}