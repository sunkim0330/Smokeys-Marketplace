import React, {useState, useEffect} from 'react';
import MarketplaceList from './MarketplaceList.jsx';
import MarketplaceSearch from './MarketplaceSearch.jsx';


const Marketplace = () => {
  return (
    <div className="marketplace-container">
    <MarketplaceSearch />
     <div className="marketplace-list-container">
      <MarketplaceList />
     </div>
    </div>
  )
};

export default Marketplace;
