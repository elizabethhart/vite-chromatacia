import { Link } from "react-router";
import "./Navbar.css";

function Navbar() {
  return (
    <nav>
      <div>
        <div>
          <Link to="">elizabethhart.com</Link>
        </div>
        <ul role="menu">
          <li>
            <Link role="menu-item" to="">
              Home
            </Link>
          </li>
          <li>
            <Link role="menu-item" to="about">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
