<<<<<<< HEAD
import React, { useEffect, useState} from "react";

const MarketplacePage = ( { getLoggedInUser }) => {

  useEffect(() => {
    getLoggedInUser();
  }, []);


  return <div>Market</div>;
=======
import React from "react";
import Marketplace from "../components/Marketplace/Marketplace.jsx";


const MarketplacePage = () => {

  return (
    <div className="marketplace-page-container">
      <h1 className="marketplace-title">MarketPlace</h1>
      <Marketplace />
    </div>
  )
>>>>>>> 357ed0ecd95816b1aabc2c54dd50847c990b153c
};

export default MarketplacePage;
