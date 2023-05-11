import React from 'react';
import { Link } from 'react-router-dom';
import Auth from "../../utils/auth";

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
        {Auth.loggedIn() ? (
          // if logged in
          < ul >
            <li>
              <Link to="/home">
                <p className="text-[15px] opacity-80 hover:opacity-100 transition duration-80 ease-in px-2.5">
                  home
                </p>
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <p className="text-[15px] opacity-80 hover:opacity-100 transition duration-80 ease-in px-2.5">
                  profile
                </p>
              </Link>
            </li>
            <li>
              <Link to="/logout" onClick={() => Auth.logout()}>
                <p className="text-[15px] opacity-80 hover:opacity-100 transition duration-80 ease-in px-2.5">
                  logout
                </p>
              </Link>
            </li>
          </ul>
        ) : (
          // iff logged out
          <ul>
            <li>
              <Link to="/login">
                <p className="text-[15px] opacity-80 hover:opacity-100 transition duration-80 ease-in px-2.5">
                  login
                </p>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <p className="text-[15px] opacity-80 hover:opacity-100 transition duration-80 ease-in px-2.5">
                  signup
                </p>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </header >
  );
}

export default Header;