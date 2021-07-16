import React, {useState, useEffect} from "react";
import AddReviewModal from './AddReviewModal.jsx'
import axios from 'axios';

const PastTradeItem = ({transactions, currentUser}) => {
  const [showModal, setShowModal] = useState(false);

  let renderPastTrades = transactions.map((trx) => {
    return (
      <div key={trx.transactionId} className="past-trade-item-container">
        <div>{trx.fromUser.firstName} {trx.fromUser.lastName}</div>
        <div>{trx.date}</div>
        <div className="past-trade-item">{trx.fromItem.name}</div>
        <div className="past-trade-item">{trx.toItem.name}</div>
        <div className="past-trade-contact">{trx.fromUser.email}</div>
        {(trx.reviewLeft === false) ? (<button type="button" className="past-trade-rating"
          onClick={() => setShowModal(true)}>
            Add Review
        </button>) : (<div>Submitted</div>)}
        <AddReviewModal  currentUser={currentUser} transaction={trx} showModal={showModal} onClose={() => setShowModal(false)}/>
      </div>
    )
  })

  return renderPastTrades;

};

export default PastTradeItem;


  /* {!submittedReview ? (<button type="button" className="past-trade-rating"
          onClick={() => setShowModal(true)}>
            Add Review
        </button>) : (<div>Submitted!</div>)} */