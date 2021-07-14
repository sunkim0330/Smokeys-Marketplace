import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard.jsx";

import axios from 'axios';

const CurrentTrades = () => {
  const [userItems, setUserItems] = useState([]);

  /**
   * REMOVE THIS FUNCTION ONCE ITEMS ROUTE IS FINALIZED
   */
  const getItems = () => {
    axios.get('/allItems')
      .then(data => {
        setUserItems(data.data)
      })
  }

  useEffect(() => {
    getItems();
  }, [])

  return (
    <div className="current-trades-container">
      {userItems.map(item => {
        return <ItemCard key={item._id} item={item} />
      })}
    </div>
  );
};

export default CurrentTrades;
