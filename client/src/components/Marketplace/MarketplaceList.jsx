import React, {useState, useEffect} from 'react';
import MarketplaceCard from './MarketplaceCard.jsx';


const MarketplaceList = () => {


  return (
    <div>
      <div className="marketplace-card-row">
          <MarketplaceCard />
          <MarketplaceCard />
          <MarketplaceCard />
          <MarketplaceCard />
          <MarketplaceCard />
      </div>
        <div className="marketplace-card-row">
          <MarketplaceCard />
          <MarketplaceCard />
          <MarketplaceCard />
          <MarketplaceCard />
          <MarketplaceCard />
        </div>
        <div className="marketplace-card-row">
          <MarketplaceCard />
          <MarketplaceCard />
          <MarketplaceCard />
          <MarketplaceCard />
          <MarketplaceCard />
        </div>
        <div className="marketplace-card-row">
          <MarketplaceCard />
          <MarketplaceCard />
          <MarketplaceCard />
          <MarketplaceCard />
          <MarketplaceCard />
        </div>
     </div>

  );
};

export default MarketplaceList;
