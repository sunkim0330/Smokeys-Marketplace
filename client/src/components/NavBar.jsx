import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = ({ logout, isLoggedIn }) => {
  const navbar = !isLoggedIn ? (
    <></>
  ) : (
    <div className="navbar-container">
      {useLocation().pathname === "/" ? (
        ""
      ) : (
        <Link to="/">
          <div className="title">Smokey's Marketplace</div>
        </Link>
      )}
      <div className="navigation">
        <Link to="/user">
          <i className="fas fa-user" />
          <br />
          <span className="tooltiptext">Go to User Page</span>
        </Link>
        <Link to="/marketplace">
          <i className="fas fa-store" />
          <br />
          <span className="tooltiptext">Go to The Marketplace</span>
        </Link>
        <a onClick={logout} href="/logout">
          <i className="fas fa-sign-out-alt"></i>
          <br />
          <span className="tooltiptext">Logout</span>
        </a>
      </div>
    </div>
  );

  return <header className="header">{navbar}</header>;
};

export default NavBar;
