import React, {useState, useEffect} from 'react';


const MarketplaceCard = () => {
  return (
    <div className="marketplace-card">
      <img src="https://placekitten.com/640/360" alt="img placeholder"/>
      <div>
        <div>Image</div>
        <div>Item Name</div>
        <div>Description</div>
        <div>User Name</div>
      </div>
    </div>
  );
};

export default MarketplaceCard;
