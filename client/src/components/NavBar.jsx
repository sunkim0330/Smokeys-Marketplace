import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = ( {logout, isLoggedIn} ) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navbar = !isLoggedIn ? (
    <></>
  ) : (
    <div className="navbar-container">
      <div className="title">Smokey's Shop</div>
      <div className="navigation">
        <Link to="/user">User Page</Link>
        <Link to="/marketplace">Marketplace</Link>
        <div onClick={logout}><a href="/logout">LOGOUT</a></div>
      </div>
    </div>
  );

  return <header className="header">{navbar}</header>;
};

export default NavBar;
