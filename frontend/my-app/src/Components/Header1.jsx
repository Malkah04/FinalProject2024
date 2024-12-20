import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header1.css";
import PLogo from "./PLogo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/" className="header-link">
          <PLogo />
          <span className="header-title"></span>
        </Link>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        &#9776; 
      </div>
      <nav className={`header-nav ${isMenuOpen ? "active" : ""}`}>
  <Link to="/Home" className="header-nav-link" onClick={closeMenus}>Home</Link>

  <div className="dropdown">
    <span className="header-nav-link" onClick={toggleDropdown}>
      Category <span style={{ marginLeft: '5px' }}>&#9660;</span>
    </span>
    {isDropdownOpen && (
      <ul className="dropdown-menu">
        <li>
          <Link to="/tote" className="dropdown-item" onClick={closeMenus}>Tote Bag</Link>
        </li>
        <li>
          <Link to="/Backpack" className="dropdown-item" onClick={closeMenus}>Backpack</Link>
        </li>
        <li>
          <Link to="/laptop" className="dropdown-item" onClick={closeMenus}>Laptop Bag</Link>
        </li>
      </ul>
    )}
  </div>

  <Link to="/cart" className="header-nav-link" onClick={closeMenus}>Cart</Link>
  <Link to="/login" className="header-nav-link" onClick={closeMenus}>Login</Link>
  <Link to="/register" className="header-nav-link" onClick={closeMenus}>Sign up</Link>
  <Link to="/Profile" className="header-nav-link" onClick={closeMenus}>Profile</Link>
</nav>

{isMenuOpen && (
  <div className="sidebar-menu">
    <Link to="/Home" className="sidebar-link" onClick={closeMenus}>Home</Link>

    <div className="dropdown">
      <span className="sidebar-link" onClick={toggleDropdown}>
        Category <span style={{ marginLeft: '5px' }}>&#9660;</span>
      </span>
      {isDropdownOpen && (
        <ul className="dropdown-menu">
          <li>
            <Link to="/tote" className="dropdown-item" onClick={closeMenus}>Tote Bag</Link>
          </li>
          <li>
            <Link to="/Backpack" className="dropdown-item" onClick={closeMenus}>Back Bag</Link>
          </li>
          <li>
            <Link to="/laptop" className="dropdown-item" onClick={closeMenus}>Laptop Bag</Link>
          </li>
        </ul>
      )}
    </div>

    <Link to="/cart" className="sidebar-link" onClick={closeMenus}>Cart</Link>
    <Link to="/login" className="sidebar-link" onClick={closeMenus}>Login</Link>
    <Link to="/register" className="header-nav-link" onClick={closeMenus}>Sign up</Link>
  </div>
)}
    </header>
  );
};

export default Header;