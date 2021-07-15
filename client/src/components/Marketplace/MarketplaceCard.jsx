import React, {useState, useEffect} from 'react';


const MarketplaceCard = ( {item, displayModal, setDisplayModal, selectedItemModal, setSelectedItemModal} ) => {


  const modalClick = (e) => {
    setDisplayModal(true)
    setSelectedItemModal({name: item.name, image: item.image_link, description: item.description})
  }

  return (
    <div className="marketplace-card">
      <img onClick={modalClick} src={item.image_link} alt="img placeholder"/>
      <div>
        <div>{item.name}</div>
        <div>{item.type}</div>
        <div>{item.description}</div>

      </div>
    </div>
  );
};

export default MarketplaceCard;
