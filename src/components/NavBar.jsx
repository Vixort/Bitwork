import React, { useState } from "react";
import { Link } from "react-router";
import "./NavBar.css";

const NavBar = ({ isLoggedIn = false, user = null }) => {
  return (
    <div>
      <div className="nav-bar">
        <div className="navigation">
          <div className="logo">Logo</div>
          <div className="store">Store</div>
          <div className="JobBoard">Job Board</div>
          <div className="Community">Community</div>
        </div>
        <div className="user-profile">
          {isLoggedIn ? (
            <>
              <div className="username">{user?.username || "Username"}</div>
              <div className="avatar">{user?.avatar || "Logo"}</div>
            </>
          ) : (
            <Link to="/login" className="signin">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
