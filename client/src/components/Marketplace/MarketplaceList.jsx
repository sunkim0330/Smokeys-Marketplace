import React, {useState, useEffect} from 'react';
import MarketplaceCard from './MarketplaceCard.jsx';
import axios from 'axios';

const MarketplaceList = ( {marketItems, setMarketItems, filteredItems} ) => {

  return (
    <div className="marketplace-card-row">
      {filteredItems.map(item => {
        return <MarketplaceCard key={item._id} item={item}
        />
      })}





     </div>

  );
};

export default MarketplaceList;
