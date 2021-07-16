import React, {useState, useEffect} from 'react';


const MarketplaceCard = ( { item, setDisplayModal, setSelectedItemModal } ) => {

  console.log(item)
  const modalClick = (e) => {
    setDisplayModal(true)
    setSelectedItemModal({
      name: item.name,
      image: item.image_link,
      description: item.description,
      firstName: item.user_docs[0].firstName,
      user_id: item.owner})
  }

  return (
    <div onClick={modalClick} className="marketplace-card">
      <img  src={item.image_link ? item.image_link : 'https://smokeys.s3.amazonaws.com/No-Image-Placeholder.svg'} alt="img placeholder"/>
      <div>
        <h4 className="marketplace-card-text">{item.name || "Untitled Item"}</h4>
        <div className="marketplace-card-text">Type: {item.type}</div>

        {item.description.length > item.description.slice(0, 40).length ? (
          <div className="marketplace-card-text">{item.description.slice(0, 40) + "..."}</div>) :
          (<div className="marketplace-card-text">{item.description}</div>)}
      </div>
    </div>
  );
};

export default MarketplaceCard;
