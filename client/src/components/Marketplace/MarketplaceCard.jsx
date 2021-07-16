import React, {useState, useEffect} from 'react';


const MarketplaceCard = ( { item, setDisplayModal, setSelectedItemModal } ) => {

  const modalClick = (e) => {
    setDisplayModal(true)
    setSelectedItemModal({
      name: item.name,
      image: item.image_link,
      description: item.description,
      firstName: item.user_docs[0].firstName})
  }

  return (
    <div onClick={modalClick} className="marketplace-card">
      <img  src={item.image_link} alt="img placeholder"/>
      <div>
        <h4 className="marketplace-card-text">{item.name}</h4>
        <div className="marketplace-card-text">Type: {item.type}</div>

        {item.description.length > item.description.slice(0, 40).length ? (
          <div className="marketplace-card-text">{item.description.slice(0, 40) + "..."}</div>) :
          (<div className="marketplace-card-text">{item.description}</div>)}
      </div>
    </div>
  );
};

export default MarketplaceCard;
