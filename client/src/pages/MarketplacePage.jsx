import React, { useEffect, useState} from "react";

const MarketplacePage = ( { getLoggedInUser }) => {

  useEffect(() => {
    getLoggedInUser();
  }, []);


  return <div>Market</div>;
};

export default MarketplacePage;
