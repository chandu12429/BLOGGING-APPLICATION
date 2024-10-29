import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Importing CSS for styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-item">Home</Link>
        </li>
        <li>
          <Link to="/about" className="nav-item">About</Link>
        </li>
        <li>
          <Link to="/blogs" className="nav-item">Blogs</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
