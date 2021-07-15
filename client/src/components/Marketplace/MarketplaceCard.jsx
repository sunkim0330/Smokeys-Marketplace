import React, {useState, useEffect} from 'react';


const MarketplaceCard = ( {item} ) => {

  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false)
  const modalClick = (e) => {
    console.log('click')
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
