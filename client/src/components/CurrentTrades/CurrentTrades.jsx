import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard.jsx";
import axios from 'axios';

const CurrentTrades = ({ currentUser }) => {
  const [userItems, setUserItems] = useState([]);

  /**
   * @dev This will get all items for the currentUser
   */
  const getItems = () => {
    axios.get(`/items/${currentUser._id}`)
      .then(data => {
        setUserItems(data.data)
      })
      .catch(err => console.log(err.message))
  }

  /**
   * @dev This will set the availability of a current item to false and remove it from the displayed items
   */
  const setItemAvailability = (_itemId) => {
    let data = JSON.stringify({
      "availability": false
    })
    var config = {
      method: 'put',
      url: `/items/availability/${_itemId}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios(config)
      .then(() => getItems())
      .catch(err => console.log(err.message))
  }

  useEffect(() => {
    getItems();
  }, [])

  return (
    <div className="current-trades-container">
      {userItems.map(item => {
        return item.availability ? <ItemCard
          key={item._id}
          item={item}
          setItemAvailability={setItemAvailability} /> : null
      })}
    </div>
  );
};

export default CurrentTrades;
