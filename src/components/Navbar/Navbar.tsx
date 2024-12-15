import { useState } from "react";
import { Link } from "react-router";

import "./Navbar.css";

function Navbar() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <nav className="nav" aria-label="Personal Website">
      <div className="nav__brand">
        <Link to="">Hello World</Link>
      </div>
      <div className="menu">
        <button
          className="menu__button"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul
          className="menu__items"
          role="menu"
          aria-label="Navigation Menu"
          aria-expanded={showMenu}
        >
          <li>
            <Link className="menu__item" role="menu-item" to="">
              Home
            </Link>
          </li>
          <li>
            <Link className="menu__item" role="menu-item" to="about">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
