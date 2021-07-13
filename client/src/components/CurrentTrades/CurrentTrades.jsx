import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard.jsx";

import axios from 'axios';

const CurrentTrades = () => {
  const [useItems, setUserItems] = useState([]);

  const getItems = () => {
    axios.get
  }

  useEffect(() => {
    axios.get('/getUser', { withCredentials: true })
      .then(data => {
        console.log(data)
      })
  }, [])

  return (
    <div className="current-trades-container">
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
    </div>
  );
};

export default CurrentTrades;
