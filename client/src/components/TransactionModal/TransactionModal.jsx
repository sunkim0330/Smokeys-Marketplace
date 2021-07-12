import React from 'react';

const TransactionModal = () => {
  return (
    <div className="transaction-modal-wrapper">
      <div className="transaction-modal">
        <h4 className="transaction-item-title">Screwdriver</h4>
        <h4 className="transaction-user-rating">Other User (3.4)</h4>
        <div className="image-wrapper">
          <img className="transaction-image" src="https://www.stanleytools.com/NA/product/images/3000x3000x96/STHT60126/STHT60126_1.jpg"></img>
        </div>
        <h4 className="transaction-item-desc">This is the world's best screwdriver!</h4>
        <h4 className="transaction-proposed-title">Proposed Trade Items</h4>
        <div className="proposed-item-wrapper">
          <h4 className="transaction-proposed-item">Hammer</h4>
          <h4 className="transaction-proposed-item">Headphones</h4>
          <h4 className="transaction-proposed-item">Pen</h4>
        </div>
        <button className="transaction-button">Make Trade!</button>
      </div>
    </div>
  )
}

export default TransactionModal;