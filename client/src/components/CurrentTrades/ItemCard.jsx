import React from "react";
import placeholder from './../../assets/imagePlaceholder.png'

const ItemCard = ({ item, setItemAvailability }) => {
  return (
    <div className="marketplace-card">
      <img
        src={item.image_link ? item.image_link : placeholder }
        alt={item.name} />
        <h4 className="marketplace-card-text">{item.name || "Untitled Item"}</h4>
        <div className="marketplace-card-text">{item.type.toLocaleUpperCase()}</div>
        {item.description.length > item.description.slice(0, 40).length ? (
          <div className="marketplace-card-text">{item.description.slice(0, 40) + "..."}</div>) :
          (<div className="marketplace-card-text">{item.description}</div>)}
      <button
        className="add-item-btn"
        onClick={() => setItemAvailability(item._id)} >X</button>
    </div>
  );
};

export default ItemCard;
