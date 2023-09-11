import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import FDLogo from "../images/FDLogo.png";

function Navbar() {
  const [activeItem, setActiveItem] = useState(null);
  const location = useLocation();
  const [openItem, setOpenItem] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const menuItems = [
    { id: 1, title: "Home", link: "/" },
    { id: 2, title: "Browse", link: "/browse" },
    // { id: 3, title: "List Your Business", link: "/join" },
  ];

  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img style={{ width: "80px", marginRight: 10 }} src={FDLogo} />{" "}
        </Link>
        <h1>
          FitDirect.{" "}
          <span style={{ fontWeight: "400", fontSize: "20px" }}>
            The perfect fit. Direct to you.
          </span>
        </h1>
      </div>
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={
              location.pathname === item.link ? "nav-item active" : "nav-item"
            }
          >
            <Link
              to={item.link}
              className="nav-link"
              onClick={() => {
                setActiveItem(item.id);
                setOpenItem(null);
                setShowMenu(false);
              }}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
