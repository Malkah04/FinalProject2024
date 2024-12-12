import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
const Category = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  
  return (
    
      
      <div className="header-category">
  <span
    className="header-nav-link"
    onClick={toggleDropdown}
    style={{ cursor: "pointer" }}
  >
    Category
  </span>
  {isDropdownOpen && (
    <ul className="category-dropdown">
      <li>
        <Link to="/category/handbags" className="dropdown-item">Totebags</Link>
      </li>
      <li>
        <Link to="/category/backpacks" className="dropdown-item">Backpacks</Link>
      </li>
      <li>
        <Link to="/category/clutches" className="dropdown-item">Laptop Sleeves</Link>
      </li>
    </ul>
  )}
</div>


  )
}

export default Category
