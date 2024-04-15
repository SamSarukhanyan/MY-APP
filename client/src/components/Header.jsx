import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css'
const Header = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className='nav_root'>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {!isLoggedIn && (
          <li>
            <NavLink to="/login">Admin Login</NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink to="/admin/products">Admin Products</NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button onClick={onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
