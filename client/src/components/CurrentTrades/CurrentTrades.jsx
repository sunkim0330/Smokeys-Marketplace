import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard.jsx";

import axios from 'axios';

const CurrentTrades = () => {
  const [userItems, setUserItems] = useState([]);

  const getItems = () => {
    axios.get('/allItems')
      .then(data => {
        setUserItems(data.data)
      })
  }

  useEffect(() => {
    // axios.get('/getUser', { withCredentials: true })
    //   .then(data => {
    //     console.log(data)
    //   });
    getItems();
  }, [])

  return (
    <div className="current-trades-container">
      {console.log(userItems)}
      {userItems.map(item => {
        return <ItemCard key={item._id} item={item} />
      })}
    </div>
  );
};

export default CurrentTrades;
