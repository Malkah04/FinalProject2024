import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header1.css"; 


import "./Header1.css";
import PLogo from "./PLogo";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
 
  return (
   
      <header className="header">
        <div className="header-logo">
          <Link to="/" className="header-link">
            <PLogo /> 
            <span className="header-title"></span>
          </Link>
        </div>
        <nav className="header-nav">
        <div>
            <Link to="/Home" className="header-nav-link">Home</Link>
          </div>
          <ul>

            <li onClick={toggleDropdown}>
          
              Category
              <span style={{ marginLeft: '5px' }}>&#9660;</span>

 	   {isDropdownOpen && (
              <ul >
                <li >
                  <Link to="/subcategory1">Subcategory 1</Link>
                </li>
                <li >
                  <Link to="/subcategory2" >Subcategory 2</Link>
                </li>
                <li >
                  <Link to="/subcategory3" >Subcategory 3</Link>
                </li>
            
              </ul>
            )}    
            </li>
            
           
          </ul>
          
          <div>
            <Link to="/cart" className="header-nav-link">cart</Link>
          </div>
          <div>
            <Link to="/login" className="header-nav-link">Login</Link>
          </div>
          <div>
            <Link to="/account" className="header-nav-link">Account</Link>
          </div>

          <span className="header-profile">
            <img src="search.png "  width="30"    alt="Profile Avatar" className="header-profile-img" /> 
            </span>
          <span className="header-profile">
            <img src="cartbag.png "  width="40"    alt="Profile Avatar" className="header-profile-img" /> 
            </span>
          <span className="header-profile">
            <img src="https://cdn2.iconfinder.com/data/icons/instagram-ui/48/jee-75-512.png "  width="50"    alt="Profile Avatar" className="header-profile-img" />           
            {/* <div className="header-dropdown">
              <Link to="/profile" className="header-dropdown-link">Profile</Link>
              <Link to="/settings" className="header-dropdown-link">Settings</Link>
              <Link to="/logout" className="header-dropdown-link">Logout</Link>
            </div> */}
          </span>
        </nav>
      </header>
    );
  };
  
 
export default Header;


