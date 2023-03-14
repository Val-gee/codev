import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

const Header = () => {
    return (
      <header className="navbar-container bg-navbar shadow-xl flex justify-between content-center py-2.5 px-7">
        <Link to="/">
          <p className="text-2xl font-semibold hover:text-[#004392] transition duration-250 ease-in">
            CoDev
          </p>
        </Link>
        <div className="navlinks flex items-center">
          <Link to="/login">
            <p className="text-[15px] opacity-80 hover:opacity-100 transition duration-80 ease-in px-2.5">
              login
            </p>
          </Link>
          <Link to="/signup">
            <p className="text-[15px] opacity-80 hover:opacity-100 transition duration-80 ease-in px-2.5">
              signup
            </p>
          </Link>

          {/* if logged in */}
          <Link to="/home">
            <p className="text-[15px] opacity-80 hover:opacity-100 transition duration-80 ease-in px-2.5">
              home
            </p>
          </Link>
          <Link to="/profile">
            <p className="text-[15px] opacity-80 hover:opacity-100 transition duration-80 ease-in px-2.5">
              profile
            </p>
          </Link>
          <Link to="/logout">
            <p className="text-[15px] opacity-80 hover:opacity-100 transition duration-80 ease-in px-2.5">
              logout
            </p>
          </Link>
        </div>
      </header>
    );
}

export default Header;