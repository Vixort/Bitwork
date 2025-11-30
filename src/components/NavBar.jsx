import React from "react";
import Link from "react";

const NavBar = () => {
  return (
    <div>
      <div className="nav-bar">
        <div className="logo"></div>
        <div className="store"></div>
        <div className="JobBoard"></div>
        <div className="Community"></div>
        <div className="user-profile">
          <div className="login">Login</div>
          <div className="signin">Sign In</div>
          <div className="if-login">Logout</div>
          <div className="username">Username</div>
          <div className="avatar"></div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
