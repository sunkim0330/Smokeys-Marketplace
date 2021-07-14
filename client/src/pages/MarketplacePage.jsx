import React, { useEffect, useState} from "react";
import Marketplace from "../components/Marketplace/Marketplace.jsx";

const MarketplacePage = ( { currentUser, getLoggedInUser, getUser, setIsLoggedIn }) => {

  useEffect(() => {
    setIsLoggedIn(true);
    !currentUser ? getUser() : getLoggedInUser();
  }, []);

  return (
    <div className="marketplace-page-container">
      <h1 className="marketplace-title">The Marketplace</h1>
      <Marketplace />
    </div>
  )
};

export default MarketplacePage;
