import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navbar = !isLoggedIn ? (
    <></>
  ) : (
    <div className="navbar-container">
      <div className="title">Smokey's Shop</div>
      <div className="navigation">
        <Link to="/user">User Page</Link>
        <Link to="/marketplace">Marketplace</Link>
        <div>Logout</div>
      </div>
    </div>
  );

  return <header className="header">{navbar}</header>;
};

export default NavBar;
