import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm';

function Header({ userName, isLoggedIn, onLogout }) {
  console.log(userName)
  return (
    <div className="header">
      <Link to="/" className="logo">
        <img width="200px" src="../../public/Logo.png" alt="Logo" />
      </Link>
      <SearchForm history={history} />
      {isLoggedIn ? (
        <div className="buttons">
          <span>{userName && userName}님 환영합니다.</span>
          <button onClick={onLogout} className="logout-button">logout</button>
        </div>
      ) : (
        <div className="buttons">
          <Link to="/login">
            <button className="login-button">Login</button>
          </Link>
          <Link to="/signup">
            <button className="signup-button">Signup</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
