import React from "react";

const ItemCard = ({ item, setItemAvailability }) => {
  return (
    <div className="marketplace-card">
      <button
        className="add-item-btn"
        onClick={() => setItemAvailability(item._id)} >Remove</button>
      <img
        src={item.image_link ? item.image_link : 'https://smokeys.s3.amazonaws.com/No-Image-Placeholder.svg'}
        alt={item.name} />
        <h4 className="marketplace-card-text">{item.name || "Untitled Item"}</h4>
        <div className="marketplace-card-text">{item.type.toLocaleUpperCase()}</div>
        {item.description.length > item.description.slice(0, 40).length ? (
          <div className="marketplace-card-text">{item.description.slice(0, 40) + "..."}</div>) :
          (<div className="marketplace-card-text">{item.description}</div>)}
    </div>
  );
};

export default ItemCard;
