import React, {useState, useEffect} from "react";
import AddReviewModal from './AddReviewModal.jsx'
import axios from 'axios';

const PastTradeItem = ({transactions}) => {
  const [showModal, setShowModal] = useState(false);
  const [submittedReview, setSubmittedReview] = useState(false);
  const [getReviews, setGetReviews] = useState([]);

  const handleModalClose = () => {
    if (submittedReview) {
      setShowModal(false);
    }
  }

  const getPastReviews = () => {
    axios({
      method: 'GET',
      url: `/reviews/60ede0c21d6313096619f493?count=100`
    })
    .then(({data}) => {
      console.log('get request after adding review', data);
      setGetReviews(data);
    })
  }

  useEffect (() => {
    getPastReviews();
  }, [])

  let renderPastTrades = transactions.map((trx) => {
    return (
      <div key={trx.transactionId} className="past-trade-item-container">
        <div>{trx.fromUser.firstName} {trx.fromUser.lastName}</div>
        <div>{trx.date}</div>
        <div className="past-trade-item">{trx.fromItem.name}</div>
        <div className="past-trade-item">{trx.toItem.name}</div>
        <div className="past-trade-contact">{trx.fromUser.email}</div>
        {!submittedReview ? (<button type="button" className="past-trade-rating"
          onClick={() => setShowModal(true)}>
            Add Review
        </button>) : (<div>Submitted!</div>)}
        <AddReviewModal setSubmittedReview={setSubmittedReview} transaction={trx} showModal={showModal} onClose={() => setShowModal(false)} getPastReviews={getPastReviews} submittedReview={submittedReview}/>
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