import React, {useState, useEffect} from 'react';
import MarketplaceCard from './MarketplaceCard.jsx';
import axios from 'axios';

const MarketplaceList = () => {

  const [items, getItems] = useState([])

  const getAllItems = () => {
    axios.get('http://localhost:4000/items')
    .then((res) => {
      getItems(res.data)
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {

  })
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
