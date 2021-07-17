import React, {useState, useEffect} from 'react';
import MarketplaceCard from './MarketplaceCard.jsx';
import axios from 'axios';

const MarketplaceList = ( {
    marketItems, setMarketItems, filteredItems,
    displayModal, setDisplayModal, selectedItemModal, setSelectedItemModal } ) => {

  return (
    <div className="marketplace-card-row">
      {filteredItems.map(item => {
        return <MarketplaceCard
          key={item._id}
          item={item}
          displayModal={displayModal}
          setDisplayModal={setDisplayModal}
          selectedItemModal={selectedItemModal}
          setSelectedItemModal={setSelectedItemModal}
        />
      })}
     </div>

  );
};

export default MarketplaceList;
