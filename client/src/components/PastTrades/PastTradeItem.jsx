import React, {useState} from "react";
import AddReviewModal from './AddReviewModal.jsx'

const PastTradeItem = ({transactions}) => {
  const [showModal, setShowModal] = useState(false)

  let renderPastTrades = transactions.map((trx) => {
    return (
      <div key={trx.transactionId} className="past-trade-item-container">
        <div>{trx.fromUser.firstName} {trx.fromUser.lastName}</div>
        <div>{trx.date}</div>
        <div className="past-trade-item">{trx.fromItem.name}</div>
        <div className="past-trade-item">{trx.toItem.name}</div>
        <div className="past-trade-contact">{trx.fromUser.email}</div>
        <button type="button" className="past-trade-rating"
          onClick={() => setShowModal(true)}>
            Add Review
        </button>
        <AddReviewModal showModal={showModal} onClose={() => setShowModal(false)}/>
      </div>
    )
  })

  return renderPastTrades;

  // return (
  //   <div className="past-trade-item-container">
  //    {renderPastTrades}
  //    <div type="button" className="past-trade-rating">Add Review</div>
  //   </div>
  // );
};

export default PastTradeItem;


// <div className="past-trade-item-container">
    //   <div>Other User</div>
    //   <div>12-2-2021</div>
    //   <div className="past-trade-item">Screwdriver</div>
    //   <div className="past-trade-item">Hammer</div>
    //   <div className="past-trade-contact">other@user.com</div>
    //   <div className="past-trade-rating">★★★★★</div>
    // </div>