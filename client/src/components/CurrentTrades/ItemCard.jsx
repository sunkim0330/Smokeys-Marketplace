import React from "react";

const ItemCard = ({ item }) => {
  return (
    <div className="current-trade-card">
      <img src={item.image_link} alt={item.name} />
      <div className="trade-card-details">
        <div className="trade-card-name">{item.name}</div>
        <div className="trade-card-type">{item.type.toLocaleUpperCase()}</div>
        <div className="trade-card-description">{item.description}</div>
      </div>
    </div>
  );
};

export default ItemCard;
