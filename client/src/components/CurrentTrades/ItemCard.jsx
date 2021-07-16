import React from "react";

const ItemCard = ({ item, setItemAvailability }) => {
  return (
    <div className="current-trade-card">
      <button
        className="current-trade-availablility"
        onClick={() => setItemAvailability(item._id)} >Remove</button>
      <img
        src={item.image_link ? item.image_link : 'https://smokeys.s3.amazonaws.com/No-Image-Placeholder.svg'}
        alt={item.name} />
      <div className="trade-card-details">
        <div className="trade-card-name">{item.name}</div>
        <div className="trade-card-type">{item.type.toLocaleUpperCase()}</div>
        <div className="trade-card-description">{item.description}</div>
      </div>
    </div>
  );
};

export default ItemCard;
